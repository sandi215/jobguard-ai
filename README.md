# SLAY HACKS 2026 — JobGuard AI

**Status: v1 BUILT 26 Nov 2026 — end-to-end working in DEMO mode (live AI pending Firebase project). Submit ≤ 8 Des 05:00 WIB.**
Registrasi Devpost selesai terpisah (25 Nov 21:43, solo, 701 peserta).

## How to run (v1)

```bash
cd app
npm install        # once — firebase + vite
npm run dev        # http://localhost:5174 (dev)
npm run build      # production build into app/dist
npm run preview    # serve the build at http://localhost:4173
npm test           # not wired — demo unit tests: node --test src/demo.test.mjs
```

No `.env` needed to try it: without Firebase config the app runs in
**DEMO MODE** (transparent local rules, clearly labeled in the UI).
To enable live Gemini, copy `app/.env.example` to `app/.env`, fill in a
Firebase project with AI Logic enabled, and rebuild — see
`NOTES.md → “Going live”`. Never commit `.env` or any secret.

Smoke test (26 Nov 2026, headless Chromium against `vite preview`):
- Scam example → **DANGER, risk 100/100**, 7 red flags (fee, ID request,
  Telegram-only, urgency, unrealistic pay, vague role, free-money lure),
  0 green flags, 3 verify steps. ✅
- Real example → **SAFE, risk 0/100**, no red flags, 5 green flags. ✅
- Plain load shows the “DEMO MODE — no live AI yet” banner. ✅
- Demo unit tests: **5/5 pass** (`node --test src/demo.test.mjs`).
- Screenshots: `screenshots/verdict-scam-demo.png`,
  `screenshots/verdict-real-demo.png`.

## Fakta event (terverifikasi dari halaman resmi 25 Nov 21:42 WIB)

- Halaman: https://slayy-hacks.devpost.com/ — Rules: https://slayy-hacks.devpost.com/rules
- Penyelenggara: **SLAY HACKS Student Community and Organization** (organizer pertama kali, bukan Devpost-managed).
- Periode: 7 Nov – 7 Des 2026. **Deadline submit: 7 Des 17:00 EST = Selasa, 8 Des 2026 05:00 WIB.**
- Judging: 8–14 Des. **Pemenang direncanakan 16 Des 2026.**
- Hadiah: **$4.500 cash** — Grand $2.000, Runner-up $1.200, 3rd $800, Best Beginner $500. (Header halaman bilang "$5.000 in prizes" — selisih $500 kemungkinan non-cash/perks, tidak dirinci.)
- Peserta: ~701 pendaftar. Solo boleh, global, online, gratis.
- ⚠️ **PAYOUT JUJUR: hadiah dibayar organizer langsung (bukan Devpost-managed), tidak ada jadwal payout yang dipublikasi. Pemenang 16 Des, cairnya kapan tidak dijamin — kemungkinan TIDAK cair sebelum 1 Jan 2027. Ini tiket lotre, bukan pemasukan pasti pra-tahun-baru.**
- ⚠️ **Best Beginner $500 TIDAK bisa diambil** — syaratnya "built entirely by first-time hackathon participants"; Sandi sudah submit Kane + BuildHybridAI.

## Konsep: JobGuard AI — AI Job-Scam Checker

**Satu kalimat:** Tempel teks lowongan kerja apa pun → AI memeriksa tanda-tanda penipuan → verdict **SAFE / CAUTION / DANGER** + alasan + checklist verifikasi.

**Masalah nyata:** Lowongan kerja palsu marak (Indonesia + global) — korban diminta bayar "admin fee", data KTP dicuri, atau diarahkan ke grup Telegram penipu. Pencari kerja, terutama yang baru lulus dan pekerja informal, tidak punya alat cepat untuk mengecek.

**Cara kerja (rencana):**
1. User paste teks lowongan (atau contoh bawaan: 1 iklan asli + 1 iklan scam).
2. Gemini (via Firebase AI Logic — infra yang sama dengan NanoBrief, free tier, sudah terbukti jalan) menganalisis red flags: minta bayaran di muka, gaji tidak masuk akal, perusahaan tidak terlacak, kontak hanya Telegram/WA pribadi, bahasa mendesak, typo massal, dll.
3. Output terstruktur: verdict + skor risiko + daftar red flags + green flags + "cek ini dulu" (3 langkah verifikasi mandiri).
4. Semua analisis client-side, teks tidak disimpan (privasi — sejalan dengan tema Responsible AI 15%).

**Kenapa konsep ini (bukan yang lain):**
- Text-based = build tercepat (~3 hari), tanpa kamera/file upload, tanpa risiko akurasi vision.
- Memakai ulang infra NanoBrief yang sudah terbukti (Firebase AI Logic + Gemini free tier) — tidak ada setup baru, tidak ada biaya.
- Domain beda dari proyek Sandi yang lain (NanoBrief = ringkasan, SplitKane = split bill, ListingDesk/StonkDesk = memo risiko token/saham, TriageLens = Jira) — tidak ada overlap.
- Demo mudah dan dramatis: paste iklan scam → verdict DANGER merah dalam hitungan detik.
- Kena semua kriteria judging: Innovation 25% (fokus job-scam, under-served), Technical 25% (Gemini + structured output), Real World Impact 20% (melindungi pencari kerja), AI Integration 15% (AI adalah inti), UX 15% (paste → verdict).

**Cadangan (singkat):** WasteSort AI — foto sampah → Gemini Vision mengklasifikasi recyclable/organic/hazardous + panduan buang. Alasan cadangan: angle sustainability kuat, tapi butuh kamera/upload + risiko akurasi vision lebih tinggi.

## Deliverables (wajib per rules)

1. Project title + overview (English).
2. Problem & solution (English).
3. AI implementation — model/API yang dipakai (Gemini via Firebase AI Logic).
4. Working demo — live app (Firebase Hosting, seperti NanoBrief) + video demo 2–4 menit (direkomendasikan; video saja boleh kalau live demo tidak ada — tapi target live app).
5. Screenshots antarmuka.
6. Source code — repo GitHub publik + README + setup instructions.
7. Team info — solo, Sandi Supriatna.

## Kriteria judging (bobot)

| Kriteria | Bobot |
|---|---|
| Innovation & Originality | 25% |
| Technical Implementation | 25% |
| Real World Impact | 20% |
| AI Integration & Responsible Use | 15% |
| User Experience & Presentation | 15% |

Catatan: halaman utama juga menampilkan rubrik judge 100 poin (Innovation 30, Technical 30, Design/UX 20, Presentation & Impact 20) — angka ini sedikit berbeda dari rules 25/25/20/15/15. Yang dipakai untuk nulis submission: rules resmi (25/25/20/15/15).

## Jadwal build

- **26 Nov (v1, done):** app end-to-end in demo mode + live-AI code path
  (Firebase AI Logic, structured JSON) + smoke test lokal + screenshots.
- **Saat Firebase project siap (langkah Sandi, lihat NOTES.md “Going live”):**
  isi `.env`, rebuild, smoke test live end-to-end (pola NanoBrief — JANGAN
  bilang live sebelum URL live dites).
- **5–7 Des:** deploy Firebase Hosting + video demo 2–4 menit + screenshots
  final + repo GitHub + tulis submission Devpost. (Slot build ini sekarang
  longgar karena v1 sudah jadi lebih awal.)
- **8 Des ≤ 05:00 WIB:** submit. Buffer: submit 7 Des malam kalau bisa.

## Struktur app

```
slay-hacks/
  README.md          (file ini)
  NOTES.md           (catatan build, risiko, keputusan, cara going-live)
  screenshots/       (verdict-scam-demo.png, verdict-real-demo.png)
  app/               (Vite project — JobGuard AI v1)
    index.html       (UI entry)
    package.json     (firebase ^13, vite ^6)
    vite.config.js   (dev 5174, preview 4173)
    .env.example     (template konfigurasi Firebase — JANGAN commit .env)
    firebase.json    (hosting config, deploy nanti)
    src/
      config.js      (env vars Firebase + App Check key)
      firebase.js    (AI Logic cloud, schema JSON, analyzeLive)
      demo.js        (analyzer demo transparan + 2 contoh iklan)
      demo.test.mjs  (unit test analyzer demo, 5/5 pass)
      main.js        (logika UI)
      styles.css
    dist/            (hasil build — gitignored)
```

## Sisa kerja sebelum submit

- [ ] Firebase project `jobguard-ai` + AI Logic + App Check (langkah Sandi — lihat NOTES.md).
- [ ] Smoke test LIVE end-to-end (URL live, bukan localhost).
- [ ] Deploy Firebase Hosting.
- [ ] Video demo 2–4 menit (tanpa audio, pola Kane/NanoBrief).
- [ ] Repo GitHub publik + README + setup instructions.
- [ ] Tulis + kirim submission Devpost (≤ 8 Des 05:00 WIB).

## Aturan yang bisa mendiskualifikasi (dari rules)

- Plagiarisme / karya bukan orisinal.
- Informasi registrasi/submission palsu atau menyesatkan.
- Misrepresentasi fungsi proyek atau kontribusi.
- Manipulasi judging/voting.
- Pelanggaran eligibility.
- Proyek harus jelas bertema AI + ada problem, solusi, dan prototipe yang berfungsi.
- Jangan masukkan data rahasia/kredensial ke submission publik.
