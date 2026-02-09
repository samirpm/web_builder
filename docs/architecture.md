# System Architecture

## Overview
The MVP is split into two primary applications:
- **Frontend (React + Vite + Tailwind + GrapesJS):** Visual editor, responsive preview, and export UI.
- **Backend (Node.js + Express):** URL import pipeline, HTML/CSS sanitation, placeholder replacement, and export packaging.

## High-Level Diagram (Textual)
1. User opens builder UI.
2. User imports a URL → Frontend calls backend `/api/import`.
3. Backend fetches HTML (Puppeteer fallback), sanitizes content, normalizes CSS, and returns cleaned HTML/CSS.
4. Frontend loads HTML into GrapesJS editor.
5. User edits content/styles → GrapesJS manages state.
6. User exports → Frontend calls `/api/export` with editor HTML/CSS.
7. Backend packages assets into a zip and returns download URL.

## Backend Responsibilities
- **Fetch HTML:**
  - Use `node-fetch` for simple pages.
  - Use `Puppeteer` for dynamic content or blocked HTML fetches.
- **Sanitize HTML:**
  - Remove scripts, trackers, and inline analytics.
  - Preserve layout and CSS references.
- **Replace Content:**
  - Replace text nodes with lorem ipsum.
  - Replace images with placeholders (e.g., via `https://picsum.photos`).
- **Parsing and Normalization:**
  - Use `Cheerio` to parse and clean HTML.
  - Return cleaned HTML + inlined CSS or extracted CSS.

## Frontend Responsibilities
- **Builder UI:**
  - Side panels (blocks, layers, styles, animations).
  - Canvas (GrapesJS editor) with responsive preview.
- **Import Flow:**
  - URL input, validation, loading states.
  - Call backend and load HTML into GrapesJS.
- **Export Flow:**
  - Gather HTML/CSS from GrapesJS.
  - Trigger download of zip from backend.

## API Endpoints (Initial)
- `POST /api/import`
  - Body: `{ url: string }`
  - Response: `{ html: string, css: string }`
- `POST /api/export`
  - Body: `{ html: string, css: string }`
  - Response: `{ downloadUrl: string }`
- `GET /api/health`
  - Response: `{ status: "ok" }`

## Module Breakdown (Phase 1)
1. **Backend scaffolding**: Express server + routes.
2. **Import pipeline**: Fetch HTML with Cheerio + Puppeteer fallback.
3. **Frontend scaffolding**: Vite + Tailwind + basic layout.
4. **Editor integration**: GrapesJS mount and configuration.
5. **Export**: Zip packaging on backend.
