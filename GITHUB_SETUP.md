# Menghubungkan ke GitHub (extendura@gmail.com)

Repository lokal sudah siap (`git init` + commit awal di branch `main`).

## Cara tercepat (GitHub CLI sudah terpasang)

Buka PowerShell di folder ini, lalu:

```powershell
powershell -ExecutionPolicy Bypass -File .\connect-github.ps1
```

Saat diminta login, gunakan akun GitHub yang terdaftar dengan **extendura@gmail.com**.

---

## Cara manual

Ikuti langkah berikut jika skrip di atas tidak dipakai.

## 1. Pastikan identitas Git (sekali saja)

Jalankan di PowerShell (ganti nama jika perlu):

```powershell
git config --global user.email "extendura@gmail.com"
git config --global user.name "Extendura"
```

## 2. Buat repository di GitHub

1. Login ke [github.com](https://github.com) dengan akun yang memakai **extendura@gmail.com**.
2. Klik **+** → **New repository**.
3. Isi:
   - **Repository name:** `extendura-website` (atau nama lain)
   - **Visibility:** Public atau Private
   - Jangan centang "Add a README" (sudah ada di lokal)
4. Klik **Create repository**.

## 3. Hubungkan & push dari folder proyek

Ganti `USERNAME` dengan username GitHub Anda (bukan email):

```powershell
cd "d:\!!!!!!!!!!!!!!!!!Extendura FILE\WEBSITE"

git remote add origin https://github.com/USERNAME/extendura-website.git
git push -u origin main
```

Saat diminta login:
- **Username:** username GitHub Anda
- **Password:** gunakan **Personal Access Token** (bukan password akun)
  - Buat di: GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic) → scope `repo`

## 4. (Opsional) GitHub CLI

Setelah memasang [GitHub CLI](https://cli.github.com/):

```powershell
gh auth login
gh repo create extendura-website --public --source=. --remote=origin --push
```

---

Setelah push berhasil, aktifkan **GitHub Pages** (Settings → Pages → Source: branch `main`, folder `/` root) untuk hosting gratis.
