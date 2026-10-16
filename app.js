const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const desk = document.querySelector('.desk');
const hero = document.querySelector('.hero');
// The browser handles the projected hit targets, keeping the color trail aligned
// with the floor even while the perspective subtly follows the pointer.
const floor = document.querySelector('.desk-grid');
const tileColors=['#6cb2ee','#e8b34f','#68ae8d','#f0cf83','#96c9e8'];
const tileFragment=document.createDocumentFragment();
for(let row=0;row<40;row++)for(let col=0;col<44;col++){
 const tile=document.createElement('span');tile.className='floor-tile';
 tile.dataset.cell=`${row}-${col}`;
 if(col%5===0&&row%5===0)tile.classList.add('grid-cross');
 tileFragment.append(tile);
}
floor.append(tileFragment);
let tileCounter=0;
const tileTimers=new WeakMap();
function tintTile(tile,soft=false){
 if(!tile||!tile.classList.contains('floor-tile'))return;
 clearTimeout(tileTimers.get(tile));
 tile.style.setProperty('--tile-color',tileColors[tileCounter++%tileColors.length]);
 tile.classList.add('painted');tile.classList.toggle('soft-tile',soft);
 tileTimers.set(tile,setTimeout(()=>tile.classList.remove('painted','soft-tile'),soft?6000:900));
}
if(!reduced.matches){
 floor.addEventListener('pointerover',e=>tintTile(e.target));
 floor.addEventListener('pointerdown',e=>tintTile(e.target));
 [[15,18],[15,19],[16,19],[20,23],[20,24],[21,24],[23,17],[23,18],[25,29]].forEach(([r,c])=>tintTile(floor.querySelector(`[data-cell="${r}-${c}"]`),true));
}
let pointerFrame=0;
if(matchMedia('(pointer:fine)').matches){
 hero.addEventListener('pointermove',e=>{
  if(reduced.matches || innerWidth<=1100)return;
  const rect=hero.getBoundingClientRect();
  const x=e.clientX/rect.width-.5,y=(e.clientY-rect.top)/rect.height-.5;
  const scale=innerHeight<=850?.75:(innerWidth>=1500?1.02:.87);
  cancelAnimationFrame(pointerFrame);
  pointerFrame=requestAnimationFrame(()=>{desk.style.transform=`translate(-50%,-50%) rotateX(${39-y*2}deg) rotateZ(${-23+x*1.3}deg) scale(${scale})`;});
 });
 hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(pointerFrame);desk.style.transform='';});
}
addEventListener('resize',()=>{desk.style.transform='';});
const filters=[...document.querySelectorAll('.year-filters button')];
const search=document.querySelector('.search input');
const papers=[...document.querySelectorAll('.paper')];
let currentYear='all';
function filterPapers(){const query=search.value.trim().toLowerCase();let count=0;for(const p of papers){p.hidden=!((currentYear==='all'||p.dataset.year===currentYear)&&p.dataset.search.includes(query));if(!p.hidden)count++;}document.querySelector('.paper-count').textContent=`${count} publication${count===1?'':'s'}`;document.querySelector('.no-results').hidden=count!==0;}
filters.forEach(btn=>btn.addEventListener('click',()=>{currentYear=btn.dataset.year;filters.forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));filterPapers();}));
search.addEventListener('input',filterPapers);
const figureDialog=document.querySelector('.figure-dialog');
document.querySelectorAll('[data-figure]').forEach(btn=>btn.addEventListener('click',()=>{figureDialog.querySelector('img').src=btn.dataset.figure;figureDialog.querySelector('img').alt=btn.dataset.caption;figureDialog.querySelector('figcaption').textContent=btn.dataset.caption;const source=figureDialog.querySelector('.figure-source');source.hidden=!btn.dataset.source;if(btn.dataset.source)source.href=btn.dataset.source;figureDialog.showModal();}));
document.querySelector('.credits-button').addEventListener('click',()=>document.querySelector('.credits-dialog').showModal());
document.querySelectorAll('dialog').forEach(dialog=>{dialog.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});});
const sections=[...document.querySelectorAll('main>section[id],footer[id]')];
const navLinks=[...document.querySelectorAll('.dock a')];
let scrollPending=false;
function activeSection(){const target=sections.filter(s=>s.getBoundingClientRect().top<=innerHeight*.45).at(-1)||sections[0];navLinks.forEach(a=>{if(a.dataset.section===target.id)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});scrollPending=false;}
addEventListener('scroll',()=>{if(!scrollPending){scrollPending=true;requestAnimationFrame(activeSection);}},{passive:true});activeSection();
