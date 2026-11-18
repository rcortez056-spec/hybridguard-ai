import { initializeApp } from "firebase/app";
import { getAI, getGenerativeModel, GoogleAIBackend, InferenceMode } from "firebase/ai";

const firebaseConfig = {
      apiKey: "AIzaSyAVG6YBzldL_99cenKVa0yRbdPQYKO4V50",
  authDomain: "hybridguardai.firebaseapp.com",
  projectId: "hybridguardai",
  "hybridguardai.firebasestorage.app",
  messagingSenderId: "973062373600",
  appId: "1:973062373600:web:24c7ff5002f42a54361085",
  measurementId: "G-54Z86NZYN4"
};

const firebaseApp = initializeApp(firebaseConfig);

// Firebase AI Logic. PREFER_ON_DEVICE uses Gemini Nano when the browser has it,
// and falls back to a cloud Gemini model when it does not.
const ai = getAI(firebaseApp, { backend: new GoogleAIBackend() });
const model = getGenerativeModel(ai, { mode: InferenceMode.PREFER_ON_DEVICE });

const statusEl = document.getElementById("status");
const outputEl = document.getElementById("output");
const inputEl = document.getElementById("input");
const scanBtn = document.getElementById("scan");

const PROMPT = `You are a security auditor. Find exposed secrets in the text below:
API keys, GitHub personal access tokens, AWS access keys, Stripe keys,
MongoDB or other database connection strings, and authorization tokens.
Reply with JSON only, in this shape:
{"findings":[{"type":"string","excerpt":"string"}]}
Use an empty findings array if none are found.

TEXT:
`;

async function scanText(text) {
  const result = await model.generateContent(PROMPT + text);
  const source = result.response.inferenceSource; // "ON_DEVICE" or "IN_CLOUD"
  const raw = result.response.text().replace(/```json|```/g, "").trim();
  return { source, findings: JSON.parse(raw).findings };
}

statusEl.textContent = "Connected to Firebase AI Logic.";

scanBtn.addEventListener("click", async () => {
  const text = inputEl.value.trim();
  if (!text) return;
  statusEl.textContent = "Scanning...";
  outputEl.textContent = "";
  try {
    const { source, findings } = await scanText(text);
    statusEl.textContent = `Scan complete. Ran ${source === "ON_DEVICE" ? "on device" : "in the cloud"}.`;
    outputEl.textContent = findings.length
      ? JSON.stringify(findings, null, 2)
      : "No exposed secrets found.";
  } catch (err) {
    statusEl.textContent = "Scan failed.";
    outputEl.textContent = String(err);
  }
});
