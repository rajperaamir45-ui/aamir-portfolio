import { onLens } from './core/lens.js';
import { render, bindEvents } from './ui/render.js';
import { renderHeader } from './ui/header.js';
import { initTheme, initSpotlight, initPalette } from './ui/effects.js';
renderHeader(); onLens(render); bindEvents(); initTheme(); initSpotlight(); initPalette(); render();
