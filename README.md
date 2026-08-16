# ASAHILIVE Professional Website

A polished, responsive, animation-heavy static website prototype for AsahiLive.

## Included
- Japanese-first language experience with automatic browser locale detection.
- Manual JP / ID / EN selector.
- Project Dawn Generation 0 showcase.
- Talent cards and profile modals for Amamiya Ren, Yuna Nanami, and Kagami Akira.
- AsahiLive branding and supplied visual assets.
- Animated hero, cosmic background, scroll reveals, modal interactions.
- "Universe Guide" front-end knowledge assistant.
- Responsive mobile layout.

## Important
The "Universe Guide" is intentionally API-free in this package. It provides a local knowledge assistant so the site works immediately without exposing an AI provider or secret API key in the browser.

For true AI translation/chat in production, connect the front-end to your own secure backend endpoint. Keep all API keys server-side. The visible website does not need to display the provider's name.

## Run
Open `index.html` directly, or serve the folder with any static web server.

For a production deployment, upload the contents to your hosting provider and point your custom domain/subdomain to it.

## Content
Official-looking copy is separated in `data.js` so you can update names, lore, colors, fan name, and links without rebuilding the design.
