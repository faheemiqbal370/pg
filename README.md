# Portify — Visual Portfolio Studio

A client-side React portfolio builder. Users enter their own details, manage skills/projects/education/experience, select a visual template, preview the result, and export a standalone HTML file.

## Requirements
- Node.js 20.19+ or 22.12+
- npm

## Run locally
```bash
npm install
npm run dev
```

## Validate
```bash
npm run lint
npm run build
```

## Features
- Empty starting portfolio; no personal sample data is prefilled.
- Live portfolio preview.
- Personal details and profile image upload.
- Add/remove skills.
- Add/edit/delete projects, education, and experience.
- Project image upload, technology tags, repository and live-demo links.
- Developer, Minimal, and Editorial visual themes.
- Automatic browser localStorage persistence.
- Open a standalone preview and export a standalone HTML file.

Data is stored in the current browser on the current device. It is not synced to an account or server. Uploaded images are stored as data URLs in localStorage, so keep image files reasonably small.
