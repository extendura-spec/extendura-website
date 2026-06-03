# Extendura Website

Website profil bisnis **Extendura** — Premium Video Editing for Content Creators.

## Preview lokal

Buka `index.html` di browser, atau jalankan server sederhana:

```bash
# Python
python -m http.server 8080

# Node (jika punya npx)
npx serve .
```

Lalu buka http://localhost:8080

## Struktur

| File | Keterangan |
|------|------------|
| `index.html` | Halaman utama (semua section) |
| `portfolio.html` | Portfolio lengkap + filter |
| `services.html` | Detail paket & harga |
| `css/styles.css` | Gaya brand (dark + gold) |
| `js/main.js` | Navigasi, filter, WhatsApp, slider |
| `assets/` | Logo, video, gambar |

## Yang perlu Anda siapkan

1. **Nomor WhatsApp** — Edit di `js/main.js` → `SITE_CONFIG.whatsapp` (format: `62812...` tanpa +)
2. **Showreel hero** — Letakkan file `assets/showreel.mp4` dan opsional `assets/hero-poster.jpg`
3. **Logo** — Ganti monogram SVG atau tambahkan `assets/logo.png`
4. **Portfolio** — Ganti placeholder dengan thumbnail video + link embed
5. **OG image** — `assets/og-image.jpg` (1200×630 px) untuk share sosial media
6. **Email & link sosial** — Sesuaikan di `index.html` dan `SITE_CONFIG`

## Deploy

**Railway (disarankan):** ikuti panduan lengkap di [RAILWAY.md](./RAILWAY.md).

Ringkas: hubungkan repo GitHub `extendura-spec/extendura-website` di [railway.app](https://railway.app) → deploy otomatis.

Alternatif: Netlify, Vercel, GitHub Pages, cPanel. Tidak perlu database.

## Brand (dari brief)

- Obsidian `#0F0F0F` · Warm Gold `#C8B89A` · Ivory `#F5F0E8` · Midnight `#1A1A2E`
- Font: Cormorant Garamond + Inter
