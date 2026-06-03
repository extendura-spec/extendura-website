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

$prevEAP = $ErrorActionPreference
$ErrorActionPreference = "Continue"
gh auth status 2>&1 | Out-Null
$loggedIn = ($LASTEXITCODE -eq 0)
$ErrorActionPreference = $prevEAP
if (-not $loggedIn) {
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

$hasOrigin = $false
$prevEAP = $ErrorActionPreference
$ErrorActionPreference = "Continue"
$originUrl = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0 -and $originUrl) { $hasOrigin = $true }
$ErrorActionPreference = $prevEAP

if ($hasOrigin) {
    Write-Host "Remote 'origin' sudah ada. Push saja..." -ForegroundColor Yellow
    git push -u origin main
} else {
    $desc = "Extendura - Premium video editing business website"
    gh repo create $RepoName --public --source=. --remote=origin --push --description $desc
}

if ($LASTEXITCODE -eq 0) {
    $url = gh repo view --json url -q .url
    $pagesUrl = "$url/settings/pages"
    Write-Host ""
    Write-Host "Berhasil! Repository: $url" -ForegroundColor Green
    Write-Host "Aktifkan GitHub Pages di: $pagesUrl" -ForegroundColor Cyan
}
