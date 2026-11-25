# NOTES — SLAY HACKS / JobGuard AI

Prep: 25 Nov 2026. **v1 BUILT: 26 Nov 2026 (demo mode).** Submit ≤ 8 Des 05:00 WIB.

## Build v1 — 26 Nov 2026 (yang sudah jalan)

- **App end-to-end berfungsi** (Vite + vanilla JS, `app/`): paste iklan →
  verdict card SAFE/CAUTION/DANGER + skor risiko 0–100 + meter + red flags
  (dengan kutipan bukti + severity) + green flags + 3 langkah verifikasi +
  tombol copy verdict + 2 contoh bawaan + disclaimer.
- **Live-AI path sudah ditulis lengkap** (`src/firebase.js`): Firebase AI
  Logic, cloud-only, model `gemini-3.5-flash-lite` (model yang TERBUKTI
  live lewat smoke test cloud NanoBrief 25 Nov — dipakai lagi supaya tidak
  menebak nama model), structured output JSON via `responseSchema`,
  normalisasi + validasi output, App Check (debug provider di localhost,
  reCAPTCHA Enterprise di production — pola sama persis dengan NanoBrief).
- **Demo mode jujur** (`src/demo.js`): analyzer rule-based transparan,
  dipakai HANYA saat app belum dikonfigurasi (atau dipilih manual).
  UI selalu menampilkan banner "DEMO MODE — no live AI yet" + badge
  "DEMO · local rules — no live AI" di tiap hasil. Demo TIDAK PERNAH
  berpura-pura jadi live AI.
  - 7 aturan red-flag (fee di muka 45, ID/bank di muka 30, gaji tak masuk
    akal 25, kontak chat-only 25, iming-iming uang gratis 20, urgensi 15,
    deskripsi samar 10) + 5 aturan green-flag (dengan bukti kutipan).
  - Threshold: ≥55 DANGER, ≥10 CAUTION, else SAFE. Sengaja konservatif:
    sinyal tipis → CAUTION, bukan DANGER.
  - Dua bug aturan ketemu saat smoke test dan sudah diperbaiki + ditambah
    unit test: (1) "REQUIREMENTS:" saja tidak cukup buat green flag
    "clear role" (butuh 2+ sinyal); (2) "No interview" tidak boleh dihitung
    sebagai green flag "interview mentioned".
- **Bukti test 26 Nov 2026:**
  - Unit test demo: **5/5 pass** (`node --test src/demo.test.mjs`).
  - Build: `npm run build` ✅ (Vite, 133 kB JS gzip 32 kB).
  - E2E headless Chromium vs `vite preview` (localhost:4173):
    contoh scam → **DANGER 100/100, 7 red flags, 0 green flags** ✅;
    contoh asli → **SAFE 0/100, 0 red flags, 5 green flags** ✅;
    banner DEMO tampil di load biasa ✅.
  - Screenshots: `screenshots/verdict-scam-demo.png`,
    `screenshots/verdict-real-demo.png`.
- **Tidak ada secret di repo ini.** `.env` tidak ada (hanya `.env.example`
  berisi placeholder). TIDAK ADA nilai yang di-copy dari
  `buildhybridai/nanobrief/.env` atau file mode 600 mana pun.

## Going live — langkah yang masih kurang (butuh Sandi)

Live AI TIDAK bisa diaktifkan dari VM ini tanpa akun Google Sandi:
Firebase CLI tidak terinstal (hilang tiap restart runtime) dan login
Firebase butuh verifikasi telepon Sandi. Langkahnya (saat Sandi sempat,
dari HP/laptopnya atau via takeover):

1. `npm i -g firebase-tools`, lalu `firebase login --no-localhost`
   (dengan `XDG_CONFIG_HOME=/tmp/fbconfig` — lihat pelajaran NanoBrief).
2. Buat project Firebase baru **`jobguard-ai`** (JANGAN pakai project
   NanoBrief `nanobrief-7c1ce`) — console.firebase.google.com → Add project.
3. Di project baru: aktifkan **AI Logic** (Build → AI Logic → Get started →
   pilih **Gemini Developer API**) dan **App Check**.
4. Register web app → salin config (apiKey, authDomain, projectId,
   storageBucket, messagingSenderId, appId) → isi ke `app/.env`
   (copy dari `app/.env.example`). Buat **reCAPTCHA Enterprise site key**
   untuk App Check → isi `VITE_APPCHECK_SITE_KEY`.
5. Daftarkan **debug token App Check** untuk localhost (Firebase console →
   App Check → Apps → Manage debug tokens) — token ini TIDAK BOLEH masuk
   repo; cukup daftarkan di console.
6. `npm run build` → deploy (`firebase deploy --only hosting`) →
   **smoke test URL LIVE end-to-end** (paste contoh scam → verdict DANGER
   dengan badge LIVE AI) SEBELUM bilang beres (aturan AGENTS.md —
   NanoBrief sempat lolos 401 di live karena site key belum masuk build).

## Yang harus dicek hari pertama build (5 Des)

- [x] Firebase AI Logic masih aktif + kuota free tier Gemini masih ada (cek di project NanoBrief dulu — kalau habis, buat project Firebase baru).
- [x] App Check: NanoBrief sempat 401 di live karena site key belum masuk build — JANGAN ulangi: smoke test URL live end-to-end SEBELUM bilang beres (aturan AGENTS.md).
- [x] Registrasi Devpost SLAY HACKS sudah dilakukan atau belum (tugas terpisah — JANGAN daftar dari prep ini).
- [x] Contoh iklan: siapkan 2 contoh REALISTIS — 1 lowongan asli (mis. dari portal kerja publik, ringkas) + 1 scam (pola umum: admin fee, gaji fantastis, kontak Telegram). Jangan pakai data perusahaan nyata yang bisa dituduh fitnah — contoh scam dibuat generik/fiktif.
- [x] Disclaimer di app: "AI verdict is a screening aid, not legal/financial advice — always verify the employer independently."
- [ ] (Tersisa) Firebase project `jobguard-ai` + `.env` + smoke test live — lihat "Going live" di atas.

## Keputusan yang sudah dibuat saat prep

1. **Konsep = JobGuard AI** (job-scam checker, text-based, Gemini via Firebase AI Logic).
   Alasan: build tercepat, infra sudah terbukti di NanoBrief, domain baru, demo dramatis.
2. **UI + submission dalam Bahasa Inggris** (juri global; organizer komunitas pelajar internasional).
3. **Target live app di Firebase Hosting** (pola sama seperti NanoBrief: `nanobrief-7c1ce.web.app`).
   Kalau Firebase project baru dibutuhkan, buat project baru `jobguard-ai` — jangan pakai project NanoBrief.
4. **Best Beginner $500 di-skip** — Sandi bukan first-time participant.
5. **Tidak ada biaya**: Gemini free tier via Firebase AI Logic (sama seperti NanoBrief), hosting Spark $0, video tanpa audio (pola Kane/NanoBrief), repo GitHub publik gratis.

## Yang harus dicek hari pertama build (5 Des)

- [ ] Firebase AI Logic masih aktif + kuota free tier Gemini masih ada (cek di project NanoBrief dulu — kalau habis, buat project Firebase baru).
- [ ] App Check: NanoBrief sempat 401 di live karena site key belum masuk build — JANGAN ulangi: smoke test URL live end-to-end SEBELUM bilang beres (aturan AGENTS.md).
- [ ] Registrasi Devpost SLAY HACKS sudah dilakukan atau belum (tugas terpisah — JANGAN daftar dari prep ini).
- [ ] Contoh iklan: siapkan 2 contoh REALISTIS — 1 lowongan asli (mis. dari portal kerja publik, ringkas) + 1 scam (pola umum: admin fee, gaji fantastis, kontak Telegram). Jangan pakai data perusahaan nyata yang bisa dituduh fitnah — contoh scam dibuat generik/fiktif.
- [ ] Disclaimer di app: "AI verdict is a screening aid, not legal/financial advice — always verify the employer independently."

## Risiko

- **Payout tidak dijamin sebelum 1 Jan 2027** (organizer bayar langsung, tanpa jadwal). Jangan janjikan ke Aa sebagai pemasukan pra-tahun-baru.
- **Organizer pertama kali** (student community) — risiko keterlambatan/komunikasi lambat. Simpan bukti submit (screenshot + receipt Devpost).
- **Slot build 5–7 Des berbagi dengan Reddit** (dan Deck the Pixels kalau KAST beres). v1 kode SUDAH jadi 26 Nov, jadi slot 5–7 Des sekarang hanya untuk: going-live + deploy + video + repo + submission. Kalau waktu mepet, potong scope: video dulu, repo belakangan — tapi jangan potong smoke test live.
- **Hallucination Gemini** pada verdict: mitigasi dengan prompt terstruktur (minta skor + bukti kutipan dari teks iklan, bukan opini bebas) + disclaimer + contoh yang terverifikasi manual.
- **Rubrik ganda**: rules resmi 25/25/20/15/15 vs rubrik judge di halaman utama 30/30/20/20 — tulis submission mengikuti rules resmi.

## Prompt Gemini (dipakai live — sudah diimplementasikan di src/firebase.js)

```
You are a job-scam screening assistant. Analyze the job advertisement below.
Return ONLY valid JSON matching the schema.
Red flags to weigh: upfront fees of any kind, unrealistic salary for the role, no verifiable company identity, contact only via personal Telegram/WhatsApp, urgency pressure ("apply now", "limited slots"), request for ID documents or bank details before any interview, vague job description, many typos or inconsistent details.
Be conservative: if the evidence is thin, choose CAUTION, not DANGER. If the ad looks like a normal posting from a traceable employer with no fee requests, choose SAFE.
Green flags to note: named company with a verifiable website/address, official company email domain, clear role and responsibilities, a real interview process, salary in a normal range for the role, no payment requested at any stage.
Always include exactly 3 verify_steps: concrete checks the reader can do before applying (e.g. search the company, check the domain, never pay upfront).

Job ad:
"""<PASTE>"""
```
Schema JSON (responseSchema) + normalisasi output ada di `src/firebase.js`. Model live: `gemini-3.5-flash-lite` (terbukti jalan di smoke test cloud NanoBrief 25 Nov 2026).

## Referensi

- Triase: ~/workspace/hackathons/triage/2026-11-25-slay-hacks.md
- Re-scan Devpost: ~/workspace/hackathons/triage/2026-11-25-devpost-rescan.md
- Pola infra (Firebase AI Logic + deploy + live smoke test): ~/workspace/hackathons/buildhybridai/NOTES.md dan e2e/live-smoke.mjs
