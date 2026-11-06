import test from 'node:test';
import assert from 'node:assert/strict';
import { initialData, validateSetName, itemTotal, setTotal, validQuantity, parseData, deleteSet, deleteItem, undoDeletion, dismissDeletion } from '../src/features/sets/model.ts';

test('validates trimmed names, boundaries and case-insensitive duplicates', () => {
  const { sets } = initialData();
  for (const name of ['', ' ', 'a', 'a'.repeat(41)]) assert.match(validateSetName(name, sets), /2–40/);
  assert.equal(validateSetName('ab', sets), undefined);
  assert.equal(validateSetName('a'.repeat(40), sets), undefined);
  assert.match(validateSetName('  WEEKLY diet  ', sets), /already exists/);
  assert.equal(validateSetName('Weekly Diet', sets, sets[0].id), undefined);
});

test('decimal quantities produce rounded line totals and recomputed basket totals', () => {
  const item = { id:'test', name:'Oats', quantity:0.125, unit:'kg', unitPriceCents:3995 };
  assert.equal(itemTotal(item), 499);
  assert.equal(itemTotal({...item, quantity:0.3, unitPriceCents:335}), 101);
  assert.equal(setTotal({id:'set',name:'Test',items:[item,{...item,id:'test2',quantity:1}]}), 4494);
  for (const quantity of [0,-1,NaN,Infinity,0.0001,1000001]) assert.equal(validQuantity(quantity), false);
  assert.equal(validQuantity(0.001), true);
});

test('undo survives serialization and restores an item without losing intervening changes', () => {
  const initial = initialData();
  let data = deleteItem(initial, 'weekly-diet', 'oats', 'undo-oats');
  data.sets[0] = {...data.sets[0],name:'Updated diet'};
  data = parseData(JSON.stringify(data));
  data = undoDeletion(data, 'undo-oats');
  assert.equal(data.sets[0].name, 'Updated diet');
  assert.deepEqual(data.sets[0].items, initial.sets[0].items);
  assert.equal(data.pending.length,0);
});

test('nested item/set deletions can be undone in either order', () => {
  for(const order of [['item','set'],['set','item']]) {
    let data=deleteItem(initialData(),'weekly-diet','oats','item');
    data=deleteSet(data,'weekly-diet','set');
    for(const id of order) data=parseData(JSON.stringify(undoDeletion(data,id)));
    assert.deepEqual(data,initialData());
  }
});

test('restoring a set resolves name collisions without dropping newer sets', () => {
  let data=deleteSet(initialData(),'weekly-diet','undo');
  data.sets.push({id:'new',name:'Weekly Diet',items:[]});
  data=undoDeletion(data,'undo');
  assert.deepEqual(data.sets.map(s=>s.name),['Weekly Diet (1)','Weekly Diet']);
  parseData(JSON.stringify(data));
});

test('dismiss permanently removes a deleted set and its dependent item undos', () => {
  let data=deleteItem(initialData(),'weekly-diet','oats','item');
  data=deleteSet(data,'weekly-diet','set');
  data=dismissDeletion(data,'set');
  assert.deepEqual(parseData(JSON.stringify(data)),{version:1,sets:[],pending:[]});
});

test('persisted empty data stays empty; malformed storage is rejected', () => {
  assert.deepEqual(parseData('{"version":1,"sets":[],"pending":[]}').sets,[]);
  for(const raw of ['invalid','null','{"version":2,"sets":[],"pending":[]}','{"version":1,"sets":[{}],"pending":[]}']) assert.throws(()=>parseData(raw));
  const invalid=initialData();
  invalid.sets[0].items[0].quantity=-1;
  assert.throws(()=>parseData(JSON.stringify(invalid)));
});
