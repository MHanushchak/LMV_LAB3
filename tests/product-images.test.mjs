import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { catalog } from '../src/features/catalog/catalog.ts';
import { productPhotos, productPhoto } from '../src/features/catalog/product-images.ts';
import { buildBasket } from '../src/features/compare/model.ts';
import { initialData } from '../src/features/sets/model.ts';

test('every catalog product has a local WebP with author, source and open license',async()=>{
 assert.deepEqual(Object.keys(productPhotos).sort(),catalog.map(p=>p.id).sort());
 for(const product of catalog){
  const photo=productPhoto(product.id);
  assert(photo.author.trim(),product.id);
  assert.equal(new URL(photo.source).hostname,'commons.wikimedia.org');
  assert(photo.license==='Public domain'||/^(CC0|CC BY(?:-SA)? \d\.\d)$/.test(photo.license),product.id);
  if(photo.license!=='Public domain')assert.equal(new URL(photo.licenseUrl).hostname,'creativecommons.org');
  assert.equal(photo.src,`/images/products/${product.id}.webp`);
  const file=new URL(`../public${photo.src}`,import.meta.url);
  const data=await readFile(file);
  assert.equal(data.subarray(0,4).toString(),'RIFF');
  assert.equal(data.subarray(8,12).toString(),'WEBP');
  assert((await stat(file)).size<60000,`${product.id} should stay lightweight`);
 }
 assert.equal(productPhoto(undefined),undefined);
 assert.equal(productPhoto('manual-product'),undefined);
 assert.equal(productPhoto('constructor'),undefined);
});
test('basket replacements resolve the replacement photo',()=>{
 const basket=buildBasket(initialData().sets[0],'atb',{milk:'lactose-free-milk'});
 const milk=basket.lines.find(line=>line.item.id==='milk');
 assert.equal(productPhoto(milk.product.id).src,'/images/products/lactose-free-milk.webp');
 assert.notEqual(productPhoto(milk.product.id).src,productPhoto('milk').src);
});
