# Mandal Events – Firebase/Netlify (Starter)

Static HTML + JS site that uses Firebase (Firestore + Storage) and deploys on Netlify.

## What’s included
- `index.html` (links to all forms)
- `assign.html` (Assignment form)
- `schedule.html` (Schedule form)
- `report.html` (Report form with photo compression + upload)
- `importer.html` (CSV → Firestore importer using PapaParse)
- `firebase-config.js` (paste your Firebase config here)
- `shared.js` (reusable helpers for Firestore/Storage)
- `templates/*.csv` sample files
- `.netlify.toml` set for static deploy (no build step)

## Quick start

1. **Create Firebase project** (or reuse): e.g. `mandaleventall`
2. **Enable Firestore + Storage**
3. **Get Web App config** from Firebase console and paste into `firebase-config.js` (see TODO section in file).
4. **(Optional for testing)** Loosen Firestore/Storage rules temporarily for create/write. Revert to admin-only later.
5. Push to **GitHub**, connect **Netlify → New Site from Git**, and deploy.

## Firestore Collections (recommended)
- `events` (id, name, month, active:boolean)
- `mandals` (id, name)
- `assignments` (mandalId, eventId, coordinatorName, phone, createdAt)
- `schedules` (mandalId, eventId, dateISO, time, venue, createdAt)
- `reports` (mandalId, eventId, guest, attendance:number, photos:[url], createdAt)

## CSV Importer
Open `/importer.html`, select a collection (`events` or `mandals`, also works for `assignments`, `schedules`, `reports` if headers match), choose a CSV, then Import.

## Netlify
- Build command: *(empty)*
- Publish directory: `.`
- Framework preset: **None**

## Security notes
- Do **NOT** ship production with public writes. Use Firebase Auth + Security Rules or do server-side admin ingestion.
- The provided forms write directly to Firestore. Adjust rules accordingly before going live.
