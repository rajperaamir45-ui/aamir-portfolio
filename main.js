import { onLens } from './core/lens.js';
import { render, bindEvents } from './ui/render.js';
import { initTheme, initSpotlight, initPalette } from './ui/effects.js';
document.getElementById('yr').textContent = new Date().getFullYear();
onLens(render); bindEvents(); initTheme(); initSpotlight(); initPalette(); render();
