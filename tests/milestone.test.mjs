import test from 'node:test';
import assert from 'node:assert/strict';
import { initialData } from '../src/features/sets/model.ts';
import { duplicateSet } from '../src/features/sets/duplicate.ts';
import { createDraft, parseDrafts, emptyDrafts } from '../src/features/drafts/model.ts';
import { defaultPreferences, parsePreferences, effectiveStores } from '../src/features/settings/model.ts';
import { compareStores, buildBasket } from '../src/features/compare/model.ts';
import { changeCartQuantity, parseCart, parseQuantity } from '../src/features/cart/model.ts';

test('duplicates independent items and generates unique names within 40 characters',()=>{
 const original=initialData();original.sets[0].name='A'.repeat(40);
 let next=0;
 let data=duplicateSet(original,'weekly-diet','copy1',()=>`item-${next++}`,'копія');
 data=duplicateSet(data,'weekly-diet','copy2',()=>`item-${next++}`,'копія');
 assert.equal(new Set(data.sets.map(s=>s.name)).size,3);
 assert(data.sets.every(s=>s.name.length<=40));
 assert(!data.sets[1].items.some(item=>original.sets[0].items.some(old=>old.id===item.id)));
 data.sets[1].items[0].quantity=5;
 assert.equal(original.sets[0].items[0].quantity,1.5);
 assert.equal(data.sets[2].items[0].quantity,1.5);
});
test('duplicating legacy starter rows retains catalog mapping after changing IDs',()=>{
 const data=initialData();for(const item of data.sets[0].items)delete item.catalogId;
 let id=0;const copy=duplicateSet(data,'weekly-diet','copy',()=>`copy-item-${id++}`).sets[1];
 assert(compareStores(copy).some(b=>b.complete));
 assert.equal(copy.items[0].catalogId,'rolled-oats');
});
test('unfinished forms, catalog filters and invalid quantity drafts round-trip',()=>{
 const data=emptyDrafts();
 data.editors['/sets']=createDraft({kind:'set'});
 data.editors['/sets'].name='Unfinished';
 const item=createDraft({kind:'item',setId:'weekly-diet'},initialData().sets[0]);
 item.mode='manual';item.quantity='0,';item.name='Partially typed';item.query='гречка';item.store='atb';
 data.editors['/sets/weekly-diet']=item;
 data.quantities['cart:1:oats']='';
 assert.deepEqual(parseDrafts(JSON.stringify(data)),data);
 assert.throws(()=>parseDrafts('{"version":2}'));
 assert.throws(()=>parseDrafts('{"version":1,"editors":{},"quantities":{"x":3}}'));
});
test('city coverage and store preferences filter ranking before Best Value',()=>{
 assert.deepEqual(effectiveStores(defaultPreferences()),['atb','silpo','varus']);
 const prefs=parsePreferences('{"version":1,"city":"kyiv","storeIds":["atb","silpo","varus"]}');
 assert.deepEqual(effectiveStores(prefs),['atb','silpo']);
 const baskets=compareStores(initialData().sets[0],effectiveStores(prefs));
 assert.equal(baskets.length,2);
 assert.equal(baskets.find(b=>b.bestValue).storeId,'silpo');
 assert.deepEqual(compareStores(initialData().sets[0],[]),[]);
 assert.throws(()=>parsePreferences('{"version":1,"city":"unknown","storeIds":[]}'));
 assert.throws(()=>parsePreferences('{"version":1,"city":"lviv","storeIds":["atb","atb"]}'));
});
test('cart quantity edits update packs, extra quantity and totals while preserving source baseline',()=>{
 const source=initialData().sets[0];
 const cart={version:1,id:'cart',city:'lviv',source,storeId:'varus',choices:{}};
 const changed=changeCartQuantity(cart,'oats',1.6);
 const basket=buildBasket(changed.source,changed.storeId,changed.choices);
 assert.equal(basket.lines[0].packs,4);
 assert.equal(basket.lines[0].suppliedQuantity,2);
 assert.equal(basket.totalCents,26600);
 assert.equal(source.items[0].quantity,1.5);
 assert.deepEqual(changed.originalSource,source);
 assert.deepEqual(parseCart(JSON.stringify(changed)),changed);
 const changedAgain=changeCartQuantity(changed,'eggs',11);
 assert.deepEqual(changedAgain.originalSource,source);
 assert.equal(buildBasket(changedAgain.source,'varus').lines[2].packs,2);
});
test('cart quantity parsing accepts comma decimals and rejects zero, negatives and excessive precision',()=>{
 assert.equal(parseQuantity('1,125'),1.125);assert.equal(parseQuantity('1.'),1);
 for(const raw of ['', '0','-1','1.0001','NaN','1e3','1000001'])assert.equal(parseQuantity(raw),null);
 const cart={version:1,source:initialData().sets[0],storeId:'atb',choices:{milk:'exclude'}};
 assert.throws(()=>changeCartQuantity(cart,'milk',2));
 assert.throws(()=>changeCartQuantity(cart,'oats',0));
});
