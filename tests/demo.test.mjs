import test from 'node:test';
import assert from 'node:assert/strict';
import { scopedStorage, readDemoSession, DEMO_SESSION_KEY, scenarioIds } from '../src/features/demo/sandbox.ts';
import { createScenarioSession } from '../src/features/demo/scenarios.ts';
import { STORAGE_KEY, parseData, setTotal, itemTotal } from '../src/features/sets/model.ts';
import { DRAFTS_KEY, parseDrafts } from '../src/features/drafts/model.ts';
import { PREFERENCES_KEY, parsePreferences, effectiveStores } from '../src/features/settings/model.ts';
import { CART_KEY, parseCart } from '../src/features/cart/model.ts';
import { buildBasket, compareStores } from '../src/features/compare/model.ts';
function memory(entries={}) { const data=new Map(Object.entries(entries)); return { getItem:k=>data.get(k)??null, setItem:(k,v)=>data.set(k,v), removeItem:k=>data.delete(k) }; }

test('each scenario provides valid, independent fixtures with fresh basket and preferences',()=>{
 for(const id of scenarioIds){
  const a=createScenarioSession(id), b=createScenarioSession(id);
  const data=parseData(a.values[STORAGE_KEY]);
  parseDrafts(a.values[DRAFTS_KEY]);
  assert.deepEqual(effectiveStores(parsePreferences(a.values[PREFERENCES_KEY])),['atb','varus']);
  assert.equal(parseCart(a.values[CART_KEY]),null);
  assert.equal(a.values['smartbasket.locale.v1'],'uk');
  data.sets.push({id:'new',name:'New set',items:[]});
  assert.deepEqual(b,createScenarioSession(id));
 }
 assert.throws(()=>createScenarioSession('unknown'));
});
test('sandbox changes survive reload and exit restores every original key without overwrite',()=>{
 const personal={ [STORAGE_KEY]:'personal sets', [DRAFTS_KEY]:'personal draft', [CART_KEY]:'personal cart', [PREFERENCES_KEY]:'personal preferences', 'smartbasket.locale.v1':'en' };
 const persistent=memory(personal), session=memory();
 const ordinary=scopedStorage(persistent,session);
 assert.equal(ordinary.getItem(STORAGE_KEY),'personal sets');
 session.setItem(DEMO_SESSION_KEY,JSON.stringify(createScenarioSession('complete-basket')));
 const sandbox=scopedStorage(persistent,session);
 for(const key of Object.keys(personal))sandbox.setItem(key,'scenario '+key);
 const reloaded=scopedStorage(persistent,session);
 for(const key of Object.keys(personal)){assert.equal(reloaded.getItem(key),'scenario '+key);assert.equal(persistent.getItem(key),personal[key]);}
 sandbox.removeItem(CART_KEY);assert.equal(sandbox.getItem(CART_KEY),null);assert.equal(persistent.getItem(CART_KEY),'personal cart');
 // A second tab with an independent session still sees personal data.
 assert.equal(scopedStorage(persistent,memory()).getItem(STORAGE_KEY),'personal sets');
 session.removeItem(DEMO_SESSION_KEY);
 for(const [key,value]of Object.entries(personal))assert.equal(reloaded.getItem(key),value);
});
test('corrupt or failed sandbox writes never fall through to personal storage',()=>{
 const persistent=memory({x:'personal'}), session=memory({[DEMO_SESSION_KEY]:'broken'});
 const store=scopedStorage(persistent,session);
 assert.throws(()=>store.getItem('x'));assert.throws(()=>store.setItem('x','changed'));assert.equal(persistent.getItem('x'),'personal');
 session.setItem(DEMO_SESSION_KEY,JSON.stringify(createScenarioSession('complete-basket')));
 const failing={...session,setItem:()=>{throw new Error('quota');}};
 assert.throws(()=>scopedStorage(persistent,failing).setItem('x','changed'));assert.equal(persistent.getItem('x'),'personal');
 assert.equal(readDemoSession(session).scenarioId,'complete-basket');
});
test('scenario totals and alternative branches match their walkthrough instructions',()=>{
 const get=id=>parseData(createScenarioSession(id).values[STORAGE_KEY]).sets[0];
 const source=get('complete-basket');
 const baskets=compareStores(source,['atb','varus']);
 assert.equal(baskets.find(b=>b.bestValue).storeId,'varus');
 assert.equal(baskets.find(b=>b.storeId==='varus').totalCents,23800);
 assert.equal(buildBasket(get('missing-product'),'atb').missingCount,1);
 assert.equal(buildBasket(get('missing-product'),'atb',{milk:'lactose-free-milk'}).totalCents,23900);
 const search=createScenarioSession('search-validation');
 assert.equal(parseDrafts(search.values[DRAFTS_KEY]).editors['/sets/weekly-diet'].query,'Avocado');
 assert.equal(setTotal(get('search-validation'))+itemTotal({...source.items[0],quantity:1}),31000);
 assert.equal(parseData(createScenarioSession('first-set').values[STORAGE_KEY]).sets.length,0);
});
