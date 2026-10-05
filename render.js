import { person, lenses, stats, experience, projects, credentials } from '../data/profile.js';
import { getLens, setLens, score } from '../core/lens.js';
const $ = s => document.querySelector(s);
const WAVES = { sine:'M0 45 '+Array.from({length:40},(_,i)=>`L${i*20} ${45+30*Math.sin(i*.6)}`).join(' '),
  square:'M0 70 '+Array.from({length:10},(_,i)=>`L${i*80} ${i%2?70:20} L${i*80+80} ${i%2?70:20}`).join(' '),
  saw:'M0 70 '+Array.from({length:10},(_,i)=>`L${i*80+78} 20 L${i*80+80} 70`).join(' ') };
const rank = (arr, focus) => arr.map((x,i)=>({...x,s:score(x.tags,focus),i})).sort((a,b)=>b.s-a.s||a.i-b.i);
const tags = (t, f) => `<div class="tags">${t.map(x=>`<span class="tag ${f.includes(x)?'hit':''}">${x}</span>`).join('')}</div>`;
let filter = 'all';

export function render() {
  const id = getLens(), L = lenses[id], f = L.focus;
  $('#hero').innerHTML = `
    <div class="lenses" role="group" aria-label="Choose a lens">${Object.entries(lenses).map(([k,v])=>`<button data-lens="${k}" aria-pressed="${k===id}">${v.label}</button>`).join('')}</div>
    <h1>${person.name}</h1><p class="role">${L.role}</p><p class="lead">${L.lead}</p>
    <svg class="signal" viewBox="0 0 800 90" preserveAspectRatio="none" aria-hidden="true"><path d="${WAVES[L.wave]}"/></svg>
    <div class="cta"><a class="btn main" href="#projects">See projects</a><a class="btn" href="${person.cv}" download>Download CV</a></div>
    <div class="stats">${stats.map(([n,l])=>`<div><b>${n}</b><span>${l}</span></div>`).join('')}</div>`;
  $('#about').innerHTML = `<div class="about"><div><h2>What I do</h2><p>${L.about}</p></div>
    <div class="bento">${[['Power & energy','Solar PV, BESS, gensets, AVR, load audits'],['Embedded & AI','STM32, ESP32, Raspberry Pi, FPGA, CNNs'],['Operations & procurement','ERP, vendor management, KPIs, SCADA/IIoT']].map(([a,b])=>`<div class="card"><h3>${a}</h3><p>${b}</p></div>`).join('')}</div></div>`;
  $('#experience').innerHTML = `<h2>Experience</h2><div class="tl">${rank(experience,f).sort((a,b)=>a.i-b.i).map(e=>`
    <article class="card ${e.s?'top':''}"><div class="row"><h3>${e.role}</h3><span class="when">${e.when}</span></div>
    <p>${e.org}, ${e.place}</p>${tags(e.tags,f)}<ul>${e.points.map(p=>`<li>${p}</li>`).join('')}</ul></article>`).join('')}</div>`;
  const all = [...new Set(projects.flatMap(p=>p.tags))];
  $('#projects').innerHTML = `<h2>Projects</h2><div class="filters">${['all',...all].map(t=>`<button data-f="${t}" aria-pressed="${t===filter}">${t}</button>`).join('')}</div>
    <div class="bento">${rank(projects,f).filter(p=>filter==='all'||p.tags.includes(filter)).map(p=>`
    <article class="card ${p.s?'top':''}"><h3>${p.title}</h3>${tags(p.tags,f)}<p>${p.blurb}</p><a class="more" href="${p.link}" target="_blank" rel="noopener">View files</a></article>`).join('')}</div>`;
  const groups = { education:'Education', publication:'Publication', awards:'Award', learning:'Learning' };
  $('#credentials').innerHTML = `<h2>Credentials</h2><div class="bento">${rank(Object.entries(credentials).flatMap(([k,v])=>v.map(x=>({...x,k}))),f).map(c=>`
    <article class="card ${c.s?'top':''}"><p>${groups[c.k]}</p><h3>${c.title}</h3><p>${c.sub}</p>${c.note?`<p>${c.note}</p>`:''}</article>`).join('')}</div>`;
  $('#contact').innerHTML = `<div class="contact"><h2>Let's talk about your next system.</h2>
    <p class="lead">Open to roles in power, automation, embedded systems and procurement engineering.</p>
    <div class="cta"><a class="btn main" href="mailto:${person.email}">Email me</a><a class="btn" href="${person.linkedin}" target="_blank" rel="noopener">LinkedIn</a></div></div>`;
  document.querySelectorAll('.card,.stats').forEach(el => el.classList.add('rv')); observe();
}
export function bindEvents() {
  document.addEventListener('click', e => {
    const l = e.target.closest('[data-lens]'); if (l) setLens(l.dataset.lens);
    const t = e.target.closest('[data-f]'); if (t) { filter = t.dataset.f; render(); }
  });
}
const io = new IntersectionObserver(es => es.forEach(x => x.isIntersecting && x.target.classList.add('in')), { threshold: .05 });
function observe() { document.querySelectorAll('.rv').forEach(el => io.observe(el)); }
