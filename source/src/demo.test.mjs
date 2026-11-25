// Unit tests for the transparent demo analyzer (no network, no Firebase).
// Run: node --test src/demo.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { analyzeDemo, SAMPLE_REAL, SAMPLE_SCAM } from "./demo.js";

test("scam example -> DANGER with fee + ID + chat-only flags", () => {
  const r = analyzeDemo(SAMPLE_SCAM);
  assert.equal(r.verdict, "DANGER");
  assert.ok(r.risk_score >= 55, `score ${r.risk_score}`);
  assert.equal(r.source, "DEMO");
  const flags = r.red_flags.map((f) => f.flag);
  assert.ok(flags.includes("Upfront fee requested"), flags.join(", "));
  assert.ok(flags.includes("ID or bank details requested upfront"), flags.join(", "));
  assert.ok(flags.includes("Contact only via personal chat app"), flags.join(", "));
  assert.ok(r.red_flags.every((f) => f.evidence && f.evidence.length > 0));
  assert.equal(r.verify_steps.length, 3);
  assert.ok(r.summary.length > 20);
  // No green flags for the scam ad: "No interview" must not count as one.
  assert.equal(r.green_flags.length, 0, r.green_flags.join(", "));
});

test("real example -> SAFE with green flags and no red flags", () => {
  const r = analyzeDemo(SAMPLE_REAL);
  assert.equal(r.verdict, "SAFE");
  assert.ok(r.risk_score < 20, `score ${r.risk_score}`);
  assert.equal(r.red_flags.length, 0);
  assert.ok(r.green_flags.length >= 3, r.green_flags.join(", "));
  assert.equal(r.verify_steps.length, 3);
});

test("empty-ish text -> SAFE, never crashes", () => {
  const r = analyzeDemo("hello");
  assert.equal(r.verdict, "SAFE");
  assert.equal(r.risk_score, 0);
});

test("urgency-only ad -> CAUTION, not DANGER", () => {
  const r = analyzeDemo(
    "We are hiring a warehouse assistant. Apply now, limited slots left! Send your details today."
  );
  assert.equal(r.verdict, "CAUTION");
  assert.ok(r.risk_score >= 10 && r.risk_score < 55, `score ${r.risk_score}`);
});

test("result shape matches the live-AI contract", () => {
  const r = analyzeDemo(SAMPLE_SCAM);
  for (const key of ["verdict", "risk_score", "red_flags", "green_flags", "summary", "verify_steps", "source", "ms"]) {
    assert.ok(key in r, `missing ${key}`);
  }
  assert.ok(typeof r.ms === "number" && r.ms >= 0);
});
