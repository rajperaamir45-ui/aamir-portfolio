import { lenses } from '../data/profile.js';
const KEY = 'portfolio.lens'; const subs = new Set();
const byCode = c => Object.keys(lenses).find(k => lenses[k].code && lenses[k].code === (c||'').toUpperCase());
let cur = byCode(new URLSearchParams(location.search).get('code')) || (() => { try { return localStorage.getItem(KEY); } catch { return null; } })();
if (!lenses[cur]) cur = 'public';
export const getLens = () => cur;
export const onLens = f => subs.add(f);
export function setLens(id) { if (!lenses[id]) return false; cur = id;
  try { localStorage.setItem(KEY, id); } catch {}
  document.documentElement.dataset.lens = id; subs.forEach(f => f(id)); return true; }
export const setByCode = c => { const k = byCode(c); return k ? setLens(k) : false; };
export const score = (tags, focus) => tags.filter(t => focus.includes(t)).length;
document.documentElement.dataset.lens = cur;
