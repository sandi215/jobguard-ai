// Transparent DEMO analyzer — used ONLY when the app is not configured
// for live Firebase AI Logic (no .env), or when the user explicitly picks
// demo mode. It is a plain rule-based checker: every flag it raises comes
// from a pattern matched against the pasted text, with the matching quote
// shown as evidence. The UI always labels demo results as
// "DEMO — no live AI", and demo verdicts are conservative by design.
//
// This file has NO network calls and NO dependencies, so it can be unit
// tested in plain Node: `node --test src/demo.test.mjs` (see demo.test.mjs).

// Each rule: patterns (regexes), weight added to the risk score, flag name,
// severity, and a short explanation. Evidence = the first matching quote.
const RULES = [
  {
    id: "upfront-fee",
    weight: 45,
    severity: "high",
    flag: "Upfront fee requested",
    explain: "Legitimate employers never ask applicants to pay to apply.",
    patterns: [
      /admin(istration)?\s*fee/i,
      /registration\s*fee/i,
      /training\s*fee/i,
      /processing\s*fee/i,
      /pay\s+(rp|usd|\$)?\s?[\d.,]+\s*(to|for|before)\s*(apply|regist|start|join)/i,
      /\bfee\b.{0,30}\b(pay|transfer|send)\b/i,
      /\b(pay|transfer|send)\b.{0,30}\bfee\b/i,
      /deposit/i,
    ],
  },
  {
    id: "unrealistic-pay",
    weight: 25,
    severity: "high",
    flag: "Unrealistic pay for the work",
    explain: "Very high pay for simple work with no experience is a classic lure.",
    patterns: [
      /earn\s+(\$|rp|usd)?\s?[\d.,]+\s*(per|\/)\s*(day|week)/i,
      /\$\s?[\d,]{3,}\s*(per|\/)\s*(day|week)/i,
      /rp\s?[\d.]{8,}\s*(per|\/)\s*(minggu|bulan|hari)/i,
      /no experience.{0,40}(high|big|fantastic)\s*(salary|pay|income)/i,
      /salary.{0,30}up to.{0,20}\$\s?[\d,]{4,}/i,
    ],
  },
  {
    id: "chat-only-contact",
    weight: 25,
    severity: "medium",
    flag: "Contact only via personal chat app",
    explain: "Real recruiters use a company email or an official application page.",
    patterns: [
      /contact (us |me |only )?(via|on|through)?\s*(telegram|whatsapp|wa)\b/i,
      /\btelegram\b.{0,20}@[\w]+/i,
      /chat (us |me )?on whatsapp/i,
      /whatsapp (only|me|us)/i,
    ],
  },
  {
    id: "urgency",
    weight: 15,
    severity: "medium",
    flag: "Urgency pressure",
    explain: "Pressure to decide immediately is a tactic to stop you checking.",
    patterns: [
      /apply (now|immediately|today|asap)/i,
      /limited slots/i,
      /only\s+\d+\s*(slots?|positions?|spots?)\s*left/i,
      /urgent(ly)?\s+(hiring|needed|required)/i,
      /first come,?\s*first served/i,
    ],
  },
  {
    id: "id-or-bank-upfront",
    weight: 30,
    severity: "high",
    flag: "ID or bank details requested upfront",
    explain: "ID cards and bank details are only needed after a real offer, never to apply.",
    patterns: [
      /\b(ktp|id card|passport)\b.{0,40}\b(send|upload|share|provide|photo)\b/i,
      /\b(send|upload|share|provide)\b.{0,40}\b(ktp|id card|passport)\b/i,
      /bank (account|details)|account number/i,
      /send (your )?(photo of )?(id|ktp|passport)/i,
    ],
  },
  {
    id: "vague-role",
    weight: 10,
    severity: "low",
    flag: "Vague job description",
    explain: "A real posting says what the job actually is, where, and for whom.",
    patterns: [
      /no experience needed.{0,60}work from home/i,
      /work from home.{0,60}no experience/i,
      /simple (task|job|work).{0,40}earn/i,
      /just (copy|paste|click|share|like)/i,
    ],
  },
  {
    id: "free-money-lure",
    weight: 20,
    severity: "medium",
    flag: "Free-money / easy-cash lure",
    explain: "Promises of effortless income are a hallmark of job scams.",
    patterns: [
      /earn money (easily|fast|quickly|from home)/i,
      /make \$\d+.*(daily|a day|per day)/i,
      /guaranteed income/i,
      /passive income/i,
      /get rich/i,
    ],
  },
];

// Green-flag patterns: trust signals that lower the score.
const GREEN_RULES = [
  {
    flag: "Named company with a verifiable identity",
    patterns: [/\b(PT|CV|Ltd\.?|Inc\.?|LLC|Corp\.?)\b/i, /www\.[\w-]+\.(com|co\.id|id|org|net)/i],
  },
  {
    flag: "Official company email or application page",
    patterns: [/[\w.+-]+@[\w-]+\.(com|co\.id|id|org|net)/i, /apply (at|via|through|on) (our )?(website|careers page|portal)/i],
  },
  {
    flag: "Clear role, location, and responsibilities",
    // Needs 2+ of these signals — a bare "REQUIREMENTS:" line alone
    // (common in scam ads too) must not earn this green flag.
    minMatches: 2,
    patterns: [/responsibilities:/i, /requirements:/i, /location:\s*\w+/i, /job type:\s*\w+/i],
  },
  {
    flag: "Real interview / selection process mentioned",
    // "No interview" is a red-flag pattern in disguise — never count it.
    notPatterns: [/no interview/i, /without (an? )?interview/i],
    patterns: [/interview/i, /selection process/i, /shortlisted/i, /walk-in interview/i],
  },
  {
    flag: "No payment requested anywhere in the ad",
    patterns: [], // handled specially: awarded when no fee rule matched
  },
];

const GENERIC_VERIFY_STEPS = [
  "Search the company name + 'scam' / 'penipuan' and check that its website, address, and reviews exist.",
  "Check the contact: a real recruiter uses a company email or an official careers page, not a personal chat account.",
  "Never pay anything to apply — no admin fee, training fee, or deposit — and never send ID or bank details before a real interview and offer.",
];

function firstQuote(text, regex) {
  const m = text.match(regex);
  if (!m) return "";
  const start = Math.max(0, m.index - 20);
  const end = Math.min(text.length, m.index + m[0].length + 20);
  const quote = text.slice(start, end).replace(/\s+/g, " ").trim();
  return (start > 0 ? "…" : "") + quote + (end < text.length ? "…" : "");
}

/**
 * Analyze a job ad with the local rule set.
 * Returns the same shape as the live AI result, plus source: "DEMO".
 * Verdict thresholds: score >= 55 DANGER, >= 10 CAUTION, else SAFE.
 * (CAUTION starts low on purpose: a single classic pressure/vagueness
 * signal is worth a warning, but never a DANGER verdict on thin evidence.)
 */
export function analyzeDemo(text) {
  const started = Date.now();
  const red_flags = [];
  let score = 0;

  for (const rule of RULES) {
    for (const re of rule.patterns) {
      const quote = firstQuote(text, re);
      if (quote) {
        score += rule.weight;
        red_flags.push({ flag: rule.flag, evidence: quote, severity: rule.severity });
        break; // one hit per rule
      }
    }
  }

  const green_flags = [];
  for (const g of GREEN_RULES) {
    if (g.patterns.length === 0) {
      if (!red_flags.some((f) => f.flag === "Upfront fee requested")) {
        green_flags.push(g.flag);
      }
      continue;
    }
    if (g.notPatterns && g.notPatterns.some((re) => re.test(text))) continue;
    if (g.patterns.some((re) => re.test(text))) {
      if (g.minMatches) {
        const hits = g.patterns.filter((re) => re.test(text)).length;
        if (hits >= g.minMatches) green_flags.push(g.flag);
      } else {
        green_flags.push(g.flag);
      }
    }
  }

  // Green flags pull the score down a little, never below 0.
  score = Math.max(0, score - green_flags.length * 5);
  score = Math.min(100, score);

  const verdict = score >= 55 ? "DANGER" : score >= 10 ? "CAUTION" : "SAFE";
  const summary =
    verdict === "DANGER"
      ? "This ad shows several classic job-scam signals. Do not pay anything or send personal documents, and verify the employer independently before engaging further."
      : verdict === "CAUTION"
        ? "This ad has some warning signs but is not conclusive. Treat it carefully and run the verification checks below before applying."
        : "No classic scam signals were found in this text. It still pays to verify the employer, but nothing here looks like a typical job scam.";

  return {
    verdict,
    risk_score: score,
    red_flags,
    green_flags,
    summary,
    verify_steps: GENERIC_VERIFY_STEPS.slice(),
    source: "DEMO",
    ms: Date.now() - started,
    demoNote:
      "Demo analysis — matched by local rules, not live AI. Connect Firebase AI Logic to get a full Gemini verdict.",
  };
}

// ---------------------------------------------------------------------------
// Built-in examples (fictional / generic — no real company is named as a scam)
// ---------------------------------------------------------------------------
export const SAMPLE_SCAM = `URGENT HIRING!!! Work From Home Data Entry — Earn Rp 15.000.000 per week, NO EXPERIENCE NEEDED!

We are hiring 50 people immediately for simple copy-paste work from your phone. No interview, start today!

REQUIREMENTS:
- Just a phone and internet
- No experience needed, anyone can join
- First come, first served — only 20 slots left!

HOW TO APPLY:
1. Pay Rp 250.000 admin fee to activate your account
2. Send a photo of your KTP / ID card to our admin
3. Contact us ONLY via Telegram @quickcash_admin

Apply NOW! Limited slots! Earn money easily from home, guaranteed income!`;

export const SAMPLE_REAL = `Junior Barista — Kopi Pagi Co., Bandung, Indonesia

Kopi Pagi Co. is a neighborhood coffee shop in Bandung (Jl. Braga 12). We are looking for a full-time Junior Barista to join our team.

Job type: Full-time, on-site
Salary: Rp 3.500.000 – Rp 4.200.000 per month (based on experience)

Responsibilities:
- Prepare espresso-based drinks to our recipes
- Keep the bar clean and stocked during your shift
- Greet customers and take orders

Requirements:
- No formal experience required, but a love of coffee helps
- Able to work weekends on a rotating roster
- Friendly, reliable, and able to stand for long shifts

Selection process: shortlisted candidates are invited to a walk-in interview at the shop, followed by a 1-day paid trial shift.

How to apply: send your CV to hiring@kopipagi.example or apply at www.kopipagi.example/careers. No fees are charged at any stage of recruitment.`;
