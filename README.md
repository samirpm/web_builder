# Static Site Builder MVP

This repository contains the MVP for a visual static website builder inspired by Webflow/WordPress, focused on developers and designers.

## Tech Stack
- **Frontend:** React (Vite), Tailwind CSS, GrapesJS
- **Backend:** Node.js (Express), Cheerio, Puppeteer Core

## Repo Structure
```
/ backend      # Node.js API
/ frontend     # React + Tailwind UI
/ docs         # Architecture and docs
```

## Development (Planned)
- Backend API for import/export pipelines.
- Frontend editor shell that integrates GrapesJS.

## Puppeteer Setup Note
The backend uses `puppeteer-core`, which requires a locally installed Chromium/Chrome.
Set `PUPPETEER_EXECUTABLE_PATH` to your browser executable path before running the backend.
