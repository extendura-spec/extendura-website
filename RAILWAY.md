# Deploy Extendura ke Railway

Website ini sudah siap di-deploy sebagai **static site** (Node + `serve`).

## 1. Akun & proyek baru

1. Buka [railway.app](https://railway.app) → login (bisa pakai GitHub **extendura-spec**).
2. **New Project** → **Deploy from GitHub repo**.
3. Pilih repo: **extendura-spec/extendura-website**.
4. Railway akan otomatis mendeteksi `package.json` dan menjalankan `npm start`.

Tunggu deploy selesai (status **Success**).

## 2. Domain Railway (gratis)

1. Buka service → tab **Settings** → **Networking** → **Generate Domain**.
2. Anda dapat URL seperti: `extendura-website-production-xxxx.up.railway.app`
3. Buka URL itu di browser — situs harus tampil.

## 3. Custom domain `extendura.com`

**Penting:** Domain harus sudah **dibeli & aktif** di registrar (Niagahoster, Cloudflare, dll.).

1. Di Railway: **Settings** → **Networking** → **Custom Domain** → tambahkan:
   - `extendura.com`
   - (opsional) `www.extendura.com`
2. Railway menampilkan **target DNS** (hostname CNAME). Salin nilainya.
3. Di panel DNS domain Anda:

   **Untuk `www` (paling mudah):**

   | Type  | Name | Value                          |
   |-------|------|--------------------------------|
   | CNAME | www  | *(hostname dari Railway)*      |

   **Untuk root `extendura.com` (tanpa www):**

   Ikuti petunjuk di dashboard Railway (bisa CNAME flattening di Cloudflare, atau record khusus yang Railway berikan).

4. Tunggu propagasi DNS (15 menit – 48 jam).
5. Railway mengaktifkan **HTTPS** otomatis setelah domain terverifikasi.

### Nonaktifkan GitHub Pages (hindari bentrok)

Jika sebelumnya pakai GitHub Pages untuk domain yang sama:

1. Buka: `github.com/extendura-spec/extendura-website/settings/pages`
2. Hapus **Custom domain** `extendura.com` → Save.
3. (Opsional) Matikan GitHub Pages atau biarkan hanya URL `github.io` sebagai backup.

## 4. Update website ke depan

Setiap `git push` ke branch `main` → Railway deploy ulang otomatis (jika GitHub connected).

```powershell
cd "d:\!!!!!!!!!!!!!!!!!Extendura FILE\WEBSITE"
git add .
git commit -m "Update konten"
git push origin main
```

## 5. Variabel lingkungan (opsional)

Biasanya tidak perlu untuk situs statis ini. Jika nanti ada API key, tambahkan di Railway → **Variables** (jangan commit ke Git).

## Troubleshooting

| Masalah | Solusi |
|---------|--------|
| Build gagal | Pastikan `package.json` ada di root repo |
| 404 di sub-halaman | Sudah pakai `serve -s` (SPA/static mode) |
| Domain tidak connect | Cek DNS di registrar; pastikan domain sudah dibeli |
| Port error | Railway set `PORT` otomatis — jangan ubah start command |

## Preview lokal (dengan Node)

```powershell
npm install
npm run dev
```

Buka http://localhost:3000
