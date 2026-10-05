import './core/lens.js';
import { renderHeader } from './ui/header.js';
import { initTheme, initSpotlight, initPalette } from './ui/effects.js';
import { servicesHTML } from './ui/services.js';
import { person } from './data/profile.js';
renderHeader(); initTheme(); initSpotlight(); initPalette();
document.getElementById('svc').innerHTML = `<div class="pagehead"><h1>Services</h1>
  <p class="lead">Practical engineering and operations help, scoped to your problem.</p></div>${servicesHTML()}
  <div class="contact" style="margin-top:3rem"><h2>Not sure which fits?</h2><a class="btn main" href="mailto:${person.email}">Tell me what you need</a></div>`;
