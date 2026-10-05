import { person } from '../data/profile.js';
const links = [['Experience','index.html#experience'],['Projects','index.html#projects'],['Services','services.html'],['Credentials','index.html#credentials'],['Contact','index.html#contact']];
// Shared by every page: edit nav once here.
export function renderHeader() {
  document.getElementById('bar').innerHTML = `<a class="brand" href="index.html">${person.name}</a>
    <nav>${links.map(([l,u])=>`<a href="${u}">${l}</a>`).join('')}</nav>
    <button class="chip" id="openPalette" aria-label="Open command menu">Search <kbd>Ctrl K</kbd></button>
    <button class="chip" id="themeBtn" aria-label="Toggle theme">Theme</button>`;
  document.body.insertAdjacentHTML('beforeend','<dialog id="palette"><input id="pq" placeholder="Jump to a page, switch lens, or enter a code" autocomplete="off"><ul id="pl"></ul></dialog>');
  const y = document.getElementById('yr'); if (y) y.textContent = new Date().getFullYear();
}
