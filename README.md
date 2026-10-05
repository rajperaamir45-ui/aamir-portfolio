# Portfolio architecture
- `js/data/profile.js` : ALL content (edit here). Add a project/job = add an object with `tags`.
- `js/core/lens.js`    : state (active lens, ?code= links, persistence).
- `js/ui/render.js`    : pure render from data + lens. `js/ui/effects.js`: theme, spotlight, Ctrl+K palette.
- `css/tokens.css`     : colors/type per theme and lens. `css/style.css`: components.
Run locally with a server (ES modules need http): `python3 -m http.server`. Deploy as-is to GitHub Pages.
