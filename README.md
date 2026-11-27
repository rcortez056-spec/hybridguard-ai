# HybridGuard AI

> An offline-first, client-side security audit utility built for the #BuildHybridAI hackathon.

> **Status: Parked.** Architecture and security hardening are complete (App Check with reCAPTCHA v3, domain-restricted reCAPTCHA key, debug tokens removed, old API key retired). Live scans are currently blocked by an unresolved App Check token issue (`401 Firebase App Check token is invalid`). See [PR #1](https://github.com/rcortez056-spec/hybridguard-ai/pull/1) for details and the next diagnostic step.

## Overview
HybridGuard AI is a lightweight web application designed to scan text, draft technical articles, and configuration files for exposed secrets (such as API keys, database URIs, and authorization tokens) before they are published.

## Architecture & Hybrid Inference
To ensure zero-trust data privacy and sub-second execution, HybridGuard AI utilizes **Firebase AI Logic**:
* **On-Device:** Scans payloads locally in the browser using **Gemini Nano** when available for instant, private evaluation.
* **Cloud Fallback:** Automatically routes to cloud-hosted Gemini models via Firebase AI Logic if the client environment lacks local model support.

## Tech Stack
* **Frontend:** Vanilla JavaScript / HTML5
* **AI Core:** Firebase AI Logic & Gemini Nano
* **Hosting & Deployment:** Vercel / GitHub Pages
* **License:** MIT

## Getting Started
1. Clone and install:
   ```bash
   git clone https://github.com/rcortez056-spec/hybridguard-ai.git
   cd hybridguard-ai
   npm install
   ```
2. Run locally:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build   # outputs to dist/
   ```

## Deployment
Deployed on **Vercel** (config in `vercel.json`). Import the repo in Vercel and it builds with Vite automatically. The app uses bare `firebase/*` imports, so it must be built first; serving the raw files (e.g. plain GitHub Pages) will not work.

## Security Notes
* **The Firebase `apiKey` in `app.js` is not a secret.** Firebase web API keys are public identifiers by design. Access is protected by **App Check (reCAPTCHA v3)** and API key HTTP-referrer restrictions, not by hiding the key. HybridGuard may flag it if you scan this repo's own source, which is expected.
* App Check debug tokens are never committed to production code.
