# Hubungkan proyek Extendura ke GitHub
# Jalankan: powershell -ExecutionPolicy Bypass -File .\connect-github.ps1

$ErrorActionPreference = "Stop"
$ProjectRoot = $PSScriptRoot
$RepoName = "extendura-website"

Set-Location $ProjectRoot

# Refresh PATH agar gh terdeteksi setelah instalasi
$env:Path = [System.Environment]::GetEnvironmentVariable("Path", "Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path", "User")

if (-not (Get-Command gh -ErrorAction SilentlyContinue)) {
    Write-Host "GitHub CLI belum terpasang. Install dari https://cli.github.com/" -ForegroundColor Red
    exit 1
}

$auth = gh auth status 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "Anda belum login ke GitHub." -ForegroundColor Yellow
    Write-Host "Jalankan perintah berikut, lalu pilih:" -ForegroundColor Yellow
    Write-Host "  - GitHub.com" -ForegroundColor Cyan
    Write-Host "  - HTTPS" -ForegroundColor Cyan
    Write-Host "  - Login via browser" -ForegroundColor Cyan
    Write-Host "  - Akun: extendura@gmail.com" -ForegroundColor Cyan
    Write-Host ""
    gh auth login
    if ($LASTEXITCODE -ne 0) { exit 1 }
}

Write-Host "Membuat repository '$RepoName' dan push ke GitHub..." -ForegroundColor Green

if (git remote get-url origin 2>$null) {
    Write-Host "Remote 'origin' sudah ada. Push saja..." -ForegroundColor Yellow
    git push -u origin main
} else {
    gh repo create $RepoName --public --source=. --remote=origin --push --description "Extendura — Premium video editing business website"
}

if ($LASTEXITCODE -eq 0) {
    $url = gh repo view --json url -q .url
    Write-Host ""
    Write-Host "Berhasil! Repository: $url" -ForegroundColor Green
    Write-Host "Aktifkan GitHub Pages di: $url/settings/pages" -ForegroundColor Cyan
}
