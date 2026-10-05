import { person, services } from '../data/profile.js';
export const servicesHTML = ({ compact = false } = {}) => `<div class="bento">${services.map(s => {
  const soon = s.status === 'soon';
  const href = compact ? `services.html#${s.id}` : `mailto:${person.email}?subject=${encodeURIComponent(s.title + ' enquiry')}`;
  return `<article class="card svc ${soon?'soon':''}" id="${s.id}"><div class="row"><h3>${s.title}</h3><span class="badge">${soon?'Coming soon':'Available'}</span></div>
    <p>${s.summary}</p>${compact||!s.items.length?'':`<ul>${s.items.map(i=>`<li>${i}</li>`).join('')}</ul>`}
    ${soon?'':`<a class="more" href="${href}">${compact?'See details':'Enquire'}</a>`}</article>`; }).join('')}</div>`;
