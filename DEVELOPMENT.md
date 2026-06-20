# camgrimsec.com — Development

Personal site for Cameron G — DevSecOps & cost optimization consulting.

Static HTML/CSS/JS. No build step.

## Local dev
```bash
python3 -m http.server 5173
```
Open http://localhost:5173

## Edit
- `index.html` — markup + copy
- `styles.css` — design tokens, layout
- `app.js` — nav scroll state, smooth anchors
- `img/` — hero background, portrait

## Deploy on Replit
1. Import this repo into Replit
2. Set run command: `python3 -m http.server 5000`
3. Open the webview

## Structure
- Hero: forest bg + h1 + single CTA → `mailto:cam@camgrimsec.com`
- Pitch + engagement terms
- "What I actually do" — 5 pillars
- Engineering teams worked with
- Recent wins (post cards)
- Contact CTA
