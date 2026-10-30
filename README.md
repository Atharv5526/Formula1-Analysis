# Formula 1 Race Intelligence Dashboard (2010–2026)

A black-and-red F1 analytics website: hero, stats, project overview, six analysis dimensions, interactive dashboard charts, a tabbed story, driver spotlight and contact form.
Based on a Tableau Public capstone using the `race_results` dataset.

## Tech stack
- HTML5, CSS3, vanilla JavaScript (no framework, no build step, no dependencies)
- Google Fonts: Orbitron and Inter (loaded from the web)

## Project structure
```
index.html        page markup
css/styles.css    all styling (dark theme, red accent, responsive)
js/data.js        chart data: edit this to use your real Tableau numbers
js/main.js        charts, filters, story tabs, counters, track animation
package.json      optional helper to start a local server
```

## Run locally
Option 1: open `index.html` in a browser.

Option 2 (local server, needs Node.js):
```
npm start
```
Then open http://localhost:3000

Option 3 (needs Python): `python -m http.server 3000`

## Update the data
Edit the `DATA` object in `js/data.js`. Values marked in the site as illustrative (DNF split, some team bars) should be replaced with exports from your `.twbx` file.

## Deploy on GitHub Pages
1. Push this folder to a GitHub repository.
2. Go to Settings → Pages.
3. Under Source, choose the `main` branch and the `/ (root)` folder, then save.
