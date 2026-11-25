// Firebase AI Logic (cloud) setup for JobGuard AI.
// Docs: https://firebase.google.com/docs/ai-logic/web
//
// ALL live AI inference in this app goes through Firebase AI Logic — no
// other model API is called anywhere in the codebase. When the app is not
// configured (no .env), the caller falls back to the transparent demo
// analyzer in demo.js — the UI always labels which engine answered.

import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaEnterpriseProvider } from "firebase/app-check";
import {
  getAI,
  getGenerativeModel,
  GoogleAIBackend,
  Schema,
} from "firebase/ai";
import { appCheckSiteKey, firebaseConfig, isConfigured, isLocalhost } from "./config.js";

// ---------------------------------------------------------------------------
// App Check (required for Firebase AI Logic; debug tokens are accepted)
// ---------------------------------------------------------------------------
let appCheckStatus = "not-configured";

function initAppCheck(app) {
  try {
    if (isLocalhost) {
      // Local development: use the App Check debug provider.
      // Must be set BEFORE initializeAppCheck. On first run the console logs
      // a debug token — register it in Firebase console > App Check > Apps >
      // Manage debug tokens. Never commit that token.
      self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;
    }
    if (appCheckSiteKey) {
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider(appCheckSiteKey),
        isTokenAutoRefreshEnabled: true,
      });
      appCheckStatus = "recaptcha-enterprise";
    } else if (isLocalhost) {
      // No production site key yet: initialize App Check so the debug
      // provider (enabled above) is used. The placeholder key is never
      // contacted while the debug provider is active.
      initializeAppCheck(app, {
        provider: new ReCaptchaEnterpriseProvider("debug-placeholder"),
        isTokenAutoRefreshEnabled: true,
      });
      appCheckStatus = "debug-provider";
    } else {
      appCheckStatus = "missing-site-key";
    }
  } catch (err) {
    console.warn("[JobGuard] App Check init failed:", err);
    appCheckStatus = "error";
  }
}

// ---------------------------------------------------------------------------
// Firebase + AI Logic (cloud only — JobGuard does not need on-device)
// ---------------------------------------------------------------------------
let app = null;
let ai = null;
let model = null;

if (isConfigured) {
  app = initializeApp(firebaseConfig);
  initAppCheck(app);
  ai = getAI(app, { backend: new GoogleAIBackend() });
} else {
  appCheckStatus = "not-configured";
}

// Structured output schema: every analysis comes back as predictable JSON.
// Verdict is a plain string with the allowed values described, so the
// schema stays valid across SDK versions; analyze() normalizes it.
const analysisSchema = Schema.object({
  properties: {
    verdict: Schema.string({
      description: "One of SAFE, CAUTION, DANGER.",
    }),
    risk_score: Schema.integer({
      description: "Risk score from 0 (safest) to 100 (most likely a scam).",
    }),
    red_flags: Schema.array({
      items: Schema.object({
        properties: {
          flag: Schema.string({
            description: "Short name of the red flag.",
          }),
          evidence: Schema.string({
            description: "Exact quote from the job ad proving this flag.",
          }),
          severity: Schema.string({
            description: "One of low, medium, high.",
          }),
        },
      }),
      description: "Suspicious signals found in the ad, with quoted evidence.",
    }),
    green_flags: Schema.array({
      items: Schema.string({
        description: "One trust signal found in the ad.",
      }),
    }),
    summary: Schema.string({
      description: "One-paragraph plain-English explanation of the verdict.",
    }),
    verify_steps: Schema.array({
      items: Schema.string({
        description: "One concrete check the user can do before applying.",
      }),
    }),
  },
});

// Model proven live through this exact SDK + pattern by NanoBrief's
// cloud fallback smoke test (25 Nov 2026). Swap in config if a newer
// flash model is preferred — keep it a free-tier Gemini model.
const CLOUD_MODEL = "gemini-3.5-flash-lite";

function getModel() {
  if (!ai) throw new Error("Firebase is not configured yet.");
  if (!model) {
    model = getGenerativeModel(ai, {
      model: CLOUD_MODEL,
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: analysisSchema,
      },
    });
  }
  return model;
}

const PROMPT = `You are a job-scam screening assistant. Analyze the job advertisement below.
Return ONLY valid JSON matching the schema.
Red flags to weigh: upfront fees of any kind, unrealistic salary for the role, no verifiable company identity, contact only via personal Telegram/WhatsApp, urgency pressure ("apply now", "limited slots"), request for ID documents or bank details before any interview, vague job description, many typos or inconsistent details.
Be conservative: if the evidence is thin, choose CAUTION, not DANGER. If the ad looks like a normal posting from a traceable employer with no fee requests, choose SAFE.
Green flags to note: named company with a verifiable website/address, official company email domain, clear role and responsibilities, a real interview process, salary in a normal range for the role, no payment requested at any stage.
Always include exactly 3 verify_steps: concrete checks the reader can do before applying (e.g. search the company, check the domain, never pay upfront).

Job ad:
"""%AD%"""`;

/** Normalize raw model output into the canonical result shape. */
function normalize(parsed) {
  const verdictRaw = String(parsed?.verdict || "CAUTION").toUpperCase();
  const verdict = ["SAFE", "CAUTION", "DANGER"].includes(verdictRaw)
    ? verdictRaw
    : "CAUTION";
  const risk = Math.max(
    0,
    Math.min(100, Number.isFinite(parsed?.risk_score) ? Math.round(parsed.risk_score) : 50)
  );
  const red_flags = Array.isArray(parsed?.red_flags)
    ? parsed.red_flags
        .filter((f) => f && f.flag)
        .map((f) => ({
          flag: String(f.flag),
          evidence: String(f.evidence || ""),
          severity: ["low", "medium", "high"].includes(String(f.severity).toLowerCase())
            ? String(f.severity).toLowerCase()
            : "medium",
        }))
    : [];
  const green_flags = Array.isArray(parsed?.green_flags)
    ? parsed.green_flags.map(String)
    : [];
  const verify_steps = Array.isArray(parsed?.verify_steps)
    ? parsed.verify_steps.map(String).slice(0, 3)
    : [];
  return {
    verdict,
    risk_score: risk,
    red_flags,
    green_flags,
    summary: String(parsed?.summary || ""),
    verify_steps,
  };
}

/**
 * Run one live analysis. Returns { ...normalized, source: "LIVE_AI", ms }.
 * Throws on any AI Logic / App Check failure — the caller decides the
 * fallback (it must NOT silently present a failed live call as a verdict).
 */
export async function analyzeLive(text) {
  const m = getModel();
  const started = performance.now();
  const result = await m.generateContent(PROMPT.replace("%AD%", text));
  const ms = Math.round(performance.now() - started);

  let parsed;
  try {
    parsed = JSON.parse(result.response.text());
  } catch {
    throw new Error("Live AI returned non-JSON output.");
  }
  return { ...normalize(parsed), source: "LIVE_AI", ms };
}

export function getAppCheckStatus() {
  return appCheckStatus;
}
