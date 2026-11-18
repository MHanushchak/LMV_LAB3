import test from 'node:test';
import assert from 'node:assert/strict';
import { catalog, searchCatalog, productForItem, alternatives } from '../src/features/catalog/catalog.ts';
import { initialData } from '../src/features/sets/model.ts';
import { buildBasket, compareStores } from '../src/features/compare/model.ts';
import { parseCart } from '../src/features/cart/model.ts';
const weekly=()=>initialData().sets[0];

test('catalog search normalizes query and combines words and store availability',()=>{
 assert.equal(searchCatalog('  ROLLED oats  ')[0].id,'rolled-oats');
 assert(searchCatalog('500 g').every(p=>p.packLabel.includes('500 g')));
 assert(!searchCatalog('milk','atb').some(p=>p.id==='milk'));
 assert(searchCatalog('milk','silpo').some(p=>p.id==='milk'));
 assert.deepEqual(searchCatalog('does-not-exist'),[]);
 assert.equal(searchCatalog('').length,catalog.length);
});
test('explicit SKU mapping preserves legacy starters but never guesses manual names',()=>{
 const oats=weekly().items[0];
 assert.equal(productForItem(oats).id,'rolled-oats');
 const legacy={...oats};
 delete legacy.catalogId;
 assert.equal(productForItem(legacy).id,'rolled-oats');
 assert.equal(productForItem({...oats,catalogId:null}),undefined);
 assert.equal(productForItem({...legacy,id:'custom'}),undefined);
 assert.equal(productForItem({...oats,unit:'L'}),undefined);
 assert.equal(productForItem({...oats,catalogId:'unknown-sku'}),undefined);
});
test('partial baskets sort by subtotal but only cheapest complete baskets win',()=>{
 const baskets=compareStores(weekly());
 assert.deepEqual(baskets.map(b=>b.storeId),['atb','varus','silpo']);
 assert.equal(baskets[0].totalCents,14300);
 assert.equal(baskets[0].missingCount,1);
 assert.equal(baskets[0].bestValue,false);
 assert.equal(baskets[1].totalCents,23800);
 assert.equal(baskets[1].bestValue,true);
 assert.equal(baskets[2].bestValue,false);
});
test('whole-pack rounding exposes extra quantity and avoids decimal drift',()=>{
 const oats={...weekly().items[0],quantity:1.1};
 const line=buildBasket({id:'set',name:'Test',items:[oats]},'atb').lines[0];
 assert.equal(line.packs,3);
 assert.equal(line.suppliedQuantity,1.5);
 assert.equal(line.totalCents,7800);
 const yogurt={id:'y',name:'Greek yogurt',catalogId:'greek-yogurt',quantity:0.9,unit:'kg',unitPriceCents:15000};
 assert.equal(buildBasket({id:'s',name:'Test',items:[yogurt]},'silpo').lines[0].packs,3);
});
test('duplicate rows share whole packs and are charged once',()=>{
 const item={...weekly().items[0],quantity:0.25};
 const basket=buildBasket({id:'s',name:'Test',items:[item,{...item,id:'second'}]},'atb');
 assert.equal(basket.totalCents,2600);
 assert.equal(basket.lines.reduce((n,line)=>n+line.packs,0),1);
 assert.equal(basket.lines.reduce((n,line)=>n+line.suppliedQuantity,0),0.5);
});
test('missing products require explicit compatible substitutions or exclusions',()=>{
 const source=weekly();
 assert.equal(alternatives(source.items[1],'atb')[0].id,'lactose-free-milk');
 const substitute=buildBasket(source,'atb',{milk:'lactose-free-milk'});
 assert.equal(substitute.missingCount,0);
 assert.equal(substitute.complete,true);
 assert.equal(substitute.totalCents,23900);
 assert.equal(substitute.lines[1].substituted,true);
 assert.equal(buildBasket(source,'atb',{milk:'rice'}).missingCount,1);
 const excluded=buildBasket(source,'atb',{milk:'exclude'});
 assert.equal(excluded.excludedCount,1);
 assert.equal(excluded.missingCount,0);
 assert.equal(excluded.complete,false);
 assert.equal(excluded.bestValue,false);
 assert.equal(excluded.totalCents,14300);
});
test('manual-only and empty sets never receive Best Value',()=>{
 const set={id:'s',name:'Custom',items:[{id:'x',name:'Unmapped',quantity:1,unit:'kg',unitPriceCents:1,catalogId:null}]};
 for(const basket of compareStores(set)){
  assert.equal(basket.missingCount,1);
  assert.equal(basket.bestValue,false);
 }
 for(const basket of compareStores({...set,items:[]})) assert.equal(basket.bestValue,false);
});
test('valid confirmed cart survives reload with source quantities and choices',()=>{
 const cart={version:1,source:weekly(),storeId:'atb',choices:{milk:'lactose-free-milk'}};
 assert.deepEqual(parseCart(JSON.stringify(cart)),cart);
 assert.equal(buildBasket(cart.source,cart.storeId,cart.choices).totalCents,23900);
 assert.equal(parseCart('null'),null);
});
test('cart rejects unresolved, invalid and all-excluded selections',()=>{
 const cart={version:1,source:weekly(),storeId:'atb',choices:{}};
 assert.throws(()=>parseCart(JSON.stringify(cart)));
 assert.throws(()=>parseCart(JSON.stringify({...cart,storeId:'unknown'})));
 assert.throws(()=>parseCart(JSON.stringify({...cart,choices:{milk:'rice'}})));
 const manual={id:'s',name:'Custom',items:[{id:'x',name:'Custom',quantity:1,unit:'kg',unitPriceCents:1,catalogId:null}]};
 assert.throws(()=>parseCart(JSON.stringify({...cart,source:manual,choices:{x:'exclude'}})));
});

test('local assortment has 20 available products per store and valid pack prices',()=>{
 assert.equal(catalog.length,24);
 assert.equal(new Set(catalog.map(product=>product.id)).size,catalog.length);
 for(const store of ['atb','silpo','varus']){
  assert.equal(searchCatalog('',store).length,20,store);
  assert(catalog.some(product=>!product.offers[store].available),`${store} retains stock gaps`);
 }
 for(const product of catalog){
  assert(product.packQuantity>0);
  assert(Number.isSafeInteger(product.referenceUnitPriceCents)&&product.referenceUnitPriceCents>0);
  for(const offer of Object.values(product.offers)){
   assert(Number.isSafeInteger(offer.packPriceCents));
   assert(offer.available?offer.packPriceCents>0:offer.packPriceCents===0);
  }
 }
});
test('expanded assortment supports Ukrainian search, stock filters and whole-pack totals',()=>{
 assert.equal(searchCatalog('хліб')[0].id,'whole-wheat-bread');
 assert.equal(searchCatalog('макарони')[0].id,'pasta');
 assert.equal(searchCatalog('миття посуду')[0].id,'dishwashing-liquid');
 assert(!searchCatalog('500 g').some(product=>product.id==='dishwashing-liquid'));
 assert(searchCatalog('500 мл').some(product=>product.id==='dishwashing-liquid'));
 assert.equal(searchCatalog('вода')[0].id,'still-water');
 assert.equal(searchCatalog('цукор','atb').length,0);
 assert.equal(searchCatalog('цукор','varus')[0].id,'sugar');
 const item={id:'water',catalogId:'still-water',name:'Still water',quantity:2,unit:'L',unitPriceCents:1500};
 const basket=buildBasket({id:'set',name:'Groceries',items:[item]},'atb');
 assert.equal(basket.lines[0].packs,2);
 assert.equal(basket.lines[0].suppliedQuantity,3);
 assert.equal(basket.totalCents,4200);
 assert.equal(basket.complete,true);
});
