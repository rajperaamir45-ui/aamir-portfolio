import { lenses } from '../data/profile.js';

const KEY = 'portfolio.lens';
let current = 'public';
const listeners = new Set();

try {
  const saved = localStorage.getItem(KEY);
  if (saved && lenses[saved]) current = saved;
} catch {}

export function getLens() {
  return current;
}

export function setLens(id) {
  if (!lenses[id]) return false;
  current = id;
  try { localStorage.setItem(KEY, id); } catch {}
  listeners.forEach(fn => fn(current));
  return true;
}

export function onLens(fn) {
  if (typeof fn !== 'function') return () => {};
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function setByCode(code) {
  if (!code) return false;
  const id = Object.keys(lenses).find(key => lenses[key].code === code);
  return id ? setLens(id) : false;
}

export function score(tags = [], focus = []) {
  if (!Array.isArray(tags) || !Array.isArray(focus) || focus.length === 0) return 0;
  return tags.reduce((total, tag) => total + (focus.includes(tag) ? 1 : 0), 0);
}
