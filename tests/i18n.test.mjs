import test from 'node:test';
import assert from 'node:assert/strict';
import { translate, ukrainian } from '../src/i18n/messages.ts';
import { searchCatalog } from '../src/features/catalog/catalog.ts';

test('switches interface strings without changing English fallback or user names',()=>{
 assert.equal(translate('uk','My Sets'),'Мої набори');
 assert.equal(translate('en','My Sets'),'My Sets');
 assert.equal(translate('uk','Власний набір Home'),'Власний набір Home');
 assert.equal(translate('uk','Set: {name}',{name:'My Sets {name}'}),'Набір: My Sets {name}');
 assert.equal(translate('uk','Item total: '),'Вартість продукту: ');
});
test('all translated templates retain the same interpolation parameters',()=>{
 for(const [english,uk] of Object.entries(ukrainian)){
  const keys=text=>[...text.matchAll(/\{(\w+)\}/g)].map(m=>m[1]).sort();
  assert.deepEqual(keys(uk),keys(english),english);
 }
});
test('Ukrainian catalog search matches translated product names and pack sizes',()=>{
 assert.equal(searchCatalog('вівсяні пластівці')[0].id,'rolled-oats');
 assert.equal(searchCatalog('молоко','atb')[0].id,'lactose-free-milk');
 assert(searchCatalog('500 г').every(product=>product.packLabel.includes('500 g')));
 assert.equal(searchCatalog('гречка')[0].id,'buckwheat');
 assert.equal(searchCatalog('rolled oats')[0].id,'rolled-oats');
});
