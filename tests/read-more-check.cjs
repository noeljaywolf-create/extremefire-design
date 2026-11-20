const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
function paragraph(lines) {
  const classes = new Set();
  return {lines, id:'', textContent:'Body text', clientWidth:300,
    get scrollHeight(){return this.lines*20;},
    getClientRects(){return [{}];},closest(){return null;},matches(){return false;},querySelector(){return null;},
    classList:{add(c){classes.add(c);},remove(c){classes.delete(c);},toggle(c,on){if(on)classes.add(c);else classes.delete(c);},contains(c){return classes.has(c);}},
    insertAdjacentElement(position,button){this.button=button;}
  };
}
const short=paragraph(4),long=paragraph(5),events={};
const document={querySelectorAll(){return [short,long];},createElement(){return {setAttribute(k,v){this[k]=v;},addEventListener(k,fn){this[k]=fn;}};}};
vm.runInNewContext(fs.readFileSync(require('node:path').join(__dirname,'../read-more.js'),'utf8'),{
 document,window:{addEventListener(k,fn){events[k]=fn;}},getComputedStyle(){return {lineHeight:'20px',fontSize:'16px'};},Number,setTimeout(fn){fn();return 1;},clearTimeout(){}
});
assert(!short.button,'Four lines must not create an unnecessary button');
assert(long.classList.contains('copy-collapsed'));
assert.equal(long.button['aria-controls'],long.id);
long.button.click();assert(!long.classList.contains('copy-collapsed'));assert.equal(long.button['aria-expanded'],'true');assert.equal(long.button.textContent,'Read less');
long.button.click();assert(long.classList.contains('copy-collapsed'));assert.equal(long.button['aria-expanded'],'false');
long.lines=3;events.resize();assert(long.button.hidden);assert(!long.classList.contains('copy-collapsed'));
long.lines=7;events.resize();assert(!long.button.hidden);assert(long.classList.contains('copy-collapsed'));
console.log('Read more: four-line threshold, expansion, ARIA state and responsive resizing passed.');
