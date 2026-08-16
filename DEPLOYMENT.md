# Deployment

## Easiest
Use any static hosting service and upload the contents of this folder.

## Custom domain
Point your domain DNS to the hosting provider, then enable HTTPS.

## AI-ready production architecture
Frontend -> `/api/translate` and `/api/guide` -> your secure server -> AI provider.
Never put a private API key in `app.js` or the browser.

The public URL can remain fully branded as AsahiLive; no AI provider name needs to appear in the UI.
