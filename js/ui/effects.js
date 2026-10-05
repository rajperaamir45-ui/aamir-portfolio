import { lenses } from '../data/profile.js';
import { setLens, setByCode } from '../core/lens.js';
const root = document.documentElement, $ = s => document.querySelector(s);
export function initTheme() {
  let t; try { t = localStorage.getItem('portfolio.theme'); } catch {}
  root.dataset.theme = t || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
  $('#themeBtn').onclick = toggle;
}
function toggle() { root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark'; try { localStorage.setItem('portfolio.theme', root.dataset.theme); } catch {} }
export function initSpotlight() {
  addEventListener('pointermove', e => { root.style.setProperty('--mx', e.clientX + 'px'); root.style.setProperty('--my', e.clientY + 'px'); }, { passive: true });
}
export function initPalette() {
  const d = $('#palette'), q = $('#pq'), ul = $('#pl');
  const cmds = [
    ...['experience','projects','services','credentials','contact'].map(s => ({ n:'Go to ' + s, run:() => location.href = (s==='services' ? 'services.html' : 'index.html#' + s) })),
    ...Object.entries(lenses).map(([k,v]) => ({ n:'Lens: ' + v.label, run:() => setLens(k) })),
    { n:'Toggle theme', run: toggle }];
  let list = cmds, sel = 0;
  const draw = () => ul.innerHTML = list.map((c,i)=>`<li class="${i===sel?'on':''}" data-i="${i}">${c.n}</li>`).join('') || '<li>No match. Try a section name or an access code.</li>';
  const open = () => { q.value=''; list=cmds; sel=0; draw(); d.showModal(); q.focus(); };
  const run = c => { d.close(); c.run(); };
  $('#openPalette').onclick = open;
  addEventListener('keydown', e => { if ((e.ctrlKey||e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); open(); } });
  q.oninput = () => { list = cmds.filter(c => c.n.toLowerCase().includes(q.value.toLowerCase())); sel = 0; draw(); };
  q.onkeydown = e => {
    if (e.key==='ArrowDown') sel = Math.min(sel+1, list.length-1); else if (e.key==='ArrowUp') sel = Math.max(sel-1,0);
    else if (e.key==='Enter') { if (setByCode(q.value.trim())) return d.close(); if (list[sel]) run(list[sel]); return; } else return;
    e.preventDefault(); draw(); };
  ul.onclick = e => { const li = e.target.closest('li[data-i]'); if (li) run(list[+li.dataset.i]); };
  d.addEventListener('click', e => { if (e.target === d) d.close(); });
}
