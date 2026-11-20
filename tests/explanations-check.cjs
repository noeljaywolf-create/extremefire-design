const fs=require('node:fs'),vm=require('node:vm'),assert=require('node:assert/strict');
const path=require('node:path'),root=path.resolve(__dirname,'..');
function element(){const classes=new Set();return {hidden:false,style:{},attributes:{},classList:{add(c){classes.add(c);},remove(c){classes.delete(c);},toggle(c,on){if(on)classes.add(c);else classes.delete(c);}},setAttribute(k,v){this.attributes[k]=v;},addEventListener(k,fn){this[k]=fn;},scrollHeight:120};}
const full=element();full.querySelector=()=>null;full.querySelectorAll=()=>[{textContent:'First explanation.'},{textContent:'Remaining explanation.'}];
const host=element();host.clientWidth=760;host.getClientRects=()=>[{}];host.closest=()=>null;host.querySelector=()=>full;host.appendChild=x=>{host.children.push(x);};host.children=[];
const card=element();card.closest=()=>({});card.querySelector=()=>{throw Error('Card must never be processed');};
const events={};vm.runInNewContext(fs.readFileSync(path.join(root,'explanations.js'),'utf8'),{document:{querySelectorAll(s){assert.equal(s,'[data-explanation]');return [host,card];},createElement:element},window:{addEventListener(k,fn){events[k]=fn;}},getComputedStyle(){return {lineHeight:'20px',fontSize:'16px'};},Number,setTimeout(fn){fn();},clearTimeout(){}});
const [preview,button]=host.children;
assert(full.hidden);assert(!preview.hidden);assert(!button.hidden);assert.equal(button.attributes['aria-expanded'],'false');assert.equal(button.attributes['aria-controls'],full.id);
button.click();assert(!full.hidden);assert(preview.hidden);assert.equal(button.textContent,'Read less');
button.click();assert(full.hidden);assert.equal(button.textContent,'Read more');
preview.scrollHeight=80;events.resize();assert(!full.hidden);assert(preview.hidden);assert(button.hidden);
preview.scrollHeight=160;events.resize();assert(full.hidden);assert(!button.hidden);
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){const html=fs.readFileSync(path.join(root,file),'utf8');if(html.includes('data-explanation'))assert(html.includes('src="explanations.js?v='),file);assert(!html.includes('class="copy-more"'));}
console.log('Scoped explanations: cards excluded, four-line threshold, expand/collapse, ARIA and resize passed.');
