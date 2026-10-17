import test,{after} from 'node:test';
import assert from 'node:assert/strict';
import {mkdtempSync,rmSync} from 'node:fs';
import {tmpdir} from 'node:os';
import {join} from 'node:path';
import {EventEmitter} from 'node:events';

const dir=mkdtempSync(join(tmpdir(),'siraji-test-'));
process.env.SIRAJI_DATA_DIR=dir;
process.env.PORT='0';
const app=await import('../server.mjs');
const {server,db,normalizeArabic,textToPassages,importDocument,search}=app;
after(()=>{db.close();rmSync(dir,{recursive:true,force:true});});
function callRoute(method,url,body){return new Promise((resolve,reject)=>{const req=new EventEmitter();Object.assign(req,{method,url,headers:{'content-type':'application/json'}});const res={status:0,headers:{},writeHead(status,headers){this.status=status;this.headers=headers;},end(payload){resolve({status:this.status,body:JSON.parse(String(payload||'{}'))});}};try{server.listeners('request')[0](req,res);}catch(error){reject(error);return;}if(body!==undefined)queueMicrotask(()=>{req.emit('data',Buffer.from(JSON.stringify(body)));req.emit('end');});});}

test('Arabic search normalizes diacritics and hamza variants',()=>{
  assert.equal(normalizeArabic('أَوْلٌ، مِيرَاث'),normalizeArabic('اول ميراث'));
});
test('empty source collection safely reports no evidence',()=>{
  const result=search('আওল');
  assert.equal(result.status,'NOT_FOUND');
  assert.equal(result.total,0);
});
test('plain text import separates headings and preserves exact original passage',()=>{
  const passages=textToPassages('# باب العول\nهَذَا نَصٌّ لِلْبَحْثِ فِي كِتَابٍ مَعْرُوفٍ.');
  assert.equal(passages[0].chapter,'باب العول');
  assert.equal(passages[0].original_text,'هَذَا نَصٌّ لِلْبَحْثِ فِي كِتَابٍ مَعْرُوفٍ.');
  assert.equal(importDocument({passages},'local-test.txt').passages_added,1);
  const found=search('هذا نص للبحث');
  assert.equal(found.total,1);
  assert.equal(found.results[0].original_text,passages[0].original_text);
  assert.equal(found.results[0].verification_status,'IMPORTED_UNREVIEWED');
});
test('imports cannot attach to an unregistered book',()=>{
  assert.throws(()=>importDocument({book_id:'not-a-book',passages:[{text:'valid enough text'}]},'test.json'),/কিতাবের ID/);
});
test('an imported JSON flag cannot claim a passage was human reviewed',()=>{
  importDocument({passages:[{text:'This exact quote was not compared against the original book edition.',verification_status:'VERIFIED_HUMAN'}]},'untrusted-review-label.json');
  assert.equal(db.prepare('SELECT verification_status FROM passages WHERE original_text LIKE \'This exact quote%\'').get().verification_status,'IMPORTED_UNREVIEWED');
  assert.equal(db.prepare("SELECT COUNT(*) n FROM passages WHERE verification_status='HUMAN_REVIEWED'").get().n,0);
});
test('calculator refuses a case when rules are not verified',async()=>{
  const {body:data}=await callRoute('POST','/api/calculator',{heirs:['wife','daughter'],estate:1000});
  assert.equal(data.status,'UNSUPPORTED_CASE');
  assert.equal(data.result,null);
});
test('health endpoint reports actual local corpus count',async()=>{
  const {body:health}=await callRoute('GET','/api/health');
  assert.equal(health.ok,true);
  assert.equal(health.source_passages,2);
});
