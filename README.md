# HybridGuard AI

> An offline-first, client-side security audit utility built for the #BuildHybridAI hackathon.

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
1. Clone the repository:
   ```bash
   git clone https://github.com/rcortez056-spec/hybridguard-ai.git
  npx -y firebase-tools@latest init ailogic 
