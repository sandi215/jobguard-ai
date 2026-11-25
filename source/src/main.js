// JobGuard AI UI logic — vanilla JS, no framework.
// One feature: paste a job ad -> verdict (SAFE / CAUTION / DANGER) via
// live Gemini (Firebase AI Logic) when configured, otherwise the
// transparent local demo analyzer. The UI always shows which engine
// answered, and never presents a demo verdict as a live AI verdict.

import { isConfigured, isLocalhost } from "./config.js";
import { analyzeLive, getAppCheckStatus } from "./firebase.js";
import { analyzeDemo, SAMPLE_REAL, SAMPLE_SCAM } from "./demo.js";

const $ = (id) => document.getElementById(id);

const state = {
  busy: false,
  mode: "auto", // auto | live | demo
};

function el(tag, cls, text) {
  const n = document.createElement(tag);
  if (cls) n.className = cls;
  if (text != null) n.textContent = text;
  return n;
}

function setStatus(text, kind = "") {
  const s = $("status");
  s.textContent = text;
  s.className = "status " + kind;
}

function engineLabel(source) {
  return source === "LIVE_AI"
    ? "LIVE AI · Gemini via Firebase AI Logic"
    : "DEMO · local rules — no live AI";
}

function renderResult(data) {
  const box = $("result");
  box.hidden = false;
  box.innerHTML = "";

  const verdictCls = data.verdict.toLowerCase(); // safe | caution | danger
  const head = el("div", "verdict-head " + verdictCls);
  head.appendChild(el("span", "verdict", data.verdict));
  head.appendChild(el("span", "score", `Risk ${data.risk_score}/100`));
  box.appendChild(head);

  // Risk meter
  const meter = el("div", "meter");
  const fill = el("div", "meter-fill " + verdictCls);
  fill.style.width = `${data.risk_score}%`;
  meter.appendChild(fill);
  box.appendChild(meter);

  const badge = el("p", "engine-badge " + (data.source === "LIVE_AI" ? "live" : "demo"),
    `${engineLabel(data.source)} · ${data.ms} ms`);
  box.appendChild(badge);

  if (data.source === "DEMO" && data.demoNote) {
    box.appendChild(el("p", "demo-note", data.demoNote));
  }

  box.appendChild(el("p", "summary-text", data.summary));

  if (data.red_flags.length) {
    box.appendChild(el("h2", "", "Red flags"));
    const ul = el("ul", "flags red");
    for (const f of data.red_flags) {
      const li = el("li", "");
      const sev = el("span", "sev " + f.severity, f.severity.toUpperCase());
      li.appendChild(sev);
      li.appendChild(el("strong", "", " " + f.flag));
      if (f.evidence) li.appendChild(el("span", "evidence", ` — “${f.evidence}”`));
      ul.appendChild(li);
    }
    box.appendChild(ul);
  } else {
    box.appendChild(el("p", "no-flags", "No red flags found in this ad."));
  }

  if (data.green_flags.length) {
    box.appendChild(el("h2", "", "Green flags"));
    const ul = el("ul", "flags green");
    for (const g of data.green_flags) ul.appendChild(el("li", "", g));
    box.appendChild(ul);
  }

  if (data.verify_steps.length) {
    box.appendChild(el("h2", "", "Verify before you apply"));
    const ol = el("ol", "verify");
    for (const s of data.verify_steps) ol.appendChild(el("li", "", s));
    box.appendChild(ol);
  }

  const actions = el("div", "actions");
  const copyBtn = el("button", "btn secondary", "Copy verdict");
  copyBtn.addEventListener("click", async () => {
    const lines = [
      `JobGuard AI verdict: ${data.verdict} (risk ${data.risk_score}/100)`,
      "",
      data.summary,
      "",
      ...data.red_flags.map((f) => `RED FLAG [${f.severity}]: ${f.flag} — "${f.evidence}"`),
      ...data.green_flags.map((g) => `GREEN FLAG: ${g}`),
      "",
      "Verify before you apply:",
      ...data.verify_steps.map((s, i) => `${i + 1}. ${s}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      copyBtn.textContent = "Copied!";
      setTimeout(() => (copyBtn.textContent = "Copy verdict"), 1500);
    } catch {
      copyBtn.textContent = "Copy failed — select the text manually";
    }
  });
  actions.appendChild(copyBtn);
  box.appendChild(actions);
}

function updateCounts() {
  const n = $("jobAd").value.length;
  $("count").textContent = `${n.toLocaleString()} characters · ~${Math.max(1, Math.round(n / 5))} words`;
  $("checkBtn").disabled = state.busy || n < 50;
  $("hint").textContent =
    n === 0 ? "Paste the full job ad text — the more complete, the better the check."
    : n < 50 ? "A little more text, please (at least 50 characters)."
    : state.mode === "demo" || !isConfigured
      ? "Ready — demo rules will check this ad (no live AI configured)."
      : "Ready — live Gemini will check this ad.";
}

async function onCheck() {
  const text = $("jobAd").value.trim();
  if (text.length < 50 || state.busy) return;
  state.busy = true;
  updateCounts();
  $("result").hidden = true;
  setStatus("Checking…", "busy");

  const wantLive = state.mode === "live" || (state.mode === "auto" && isConfigured);
  try {
    const data = wantLive ? await analyzeLive(text) : analyzeDemo(text);
    renderResult(data);
    setStatus(
      data.source === "LIVE_AI"
        ? `Done — live Gemini verdict: ${data.verdict}.`
        : `Done — demo verdict: ${data.verdict}. (Demo rules only — connect Firebase AI Logic for live AI.)`,
      "ok"
    );
  } catch (err) {
    console.error(err);
    setStatus(
      `Live AI check failed: ${err?.message || err}. ` +
        "Your text was not analyzed. If you are the developer, check the Firebase setup in NOTES.md; " +
        "or switch to Demo mode to try the local rules.",
      "error"
    );
  } finally {
    state.busy = false;
    updateCounts();
  }
}

function loadExample(kind) {
  $("jobAd").value = kind === "scam" ? SAMPLE_SCAM : SAMPLE_REAL;
  $("result").hidden = true;
  setStatus("", "");
  updateCounts();
  $("jobAd").focus();
}

function initMode() {
  const sel = $("modeSelect");
  if (!isConfigured) {
    sel.value = "demo";
    state.mode = "demo";
    sel.disabled = true;
    $("modeNote").textContent =
      "Live AI is not configured yet (no Firebase project). Demo mode uses transparent local rules — see NOTES.md 'Going live'.";
  } else {
    sel.value = "auto";
    state.mode = "auto";
  }
  sel.addEventListener("change", (e) => {
    state.mode = e.target.value;
    updateCounts();
  });
}

function init() {
  // Demo banner (honest state, always visible when not configured)
  if (!isConfigured) {
    $("demoBanner").hidden = false;
  }
  $("appcheckNote").textContent = `App Check: ${getAppCheckStatus()}${isLocalhost ? " · localhost" : ""}`;

  initMode();

  $("sampleScamBtn").addEventListener("click", () => loadExample("scam"));
  $("sampleRealBtn").addEventListener("click", () => loadExample("real"));
  $("clearBtn").addEventListener("click", () => {
    $("jobAd").value = "";
    $("result").hidden = true;
    setStatus("", "");
    updateCounts();
    $("jobAd").focus();
  });
  $("jobAd").addEventListener("input", updateCounts);
  $("checkBtn").addEventListener("click", onCheck);

  // Smoke-test / demo-video helper: ?example=scam|real&autorun=1
  // loads an example and runs the check automatically on page load.
  const params = new URLSearchParams(location.search);
  const example = params.get("example");
  if (example === "scam" || example === "real") {
    loadExample(example);
    if (params.get("autorun") === "1") {
      setTimeout(onCheck, 150);
    }
  }

  updateCounts();
}

init();
