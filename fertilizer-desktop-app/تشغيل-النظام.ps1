# Fertilizer Factory Management System Launcher
Write-Host "================================================" -ForegroundColor Green
Write-Host "       نظام إدارة مصنع الأسمدة" -ForegroundColor Cyan
Write-Host "    شركة الواصلون للتعدين والصناعات الكيميائية" -ForegroundColor Yellow
Write-Host "================================================" -ForegroundColor Green
Write-Host ""
Write-Host "جارٍ تشغيل النظام..." -ForegroundColor White
Write-Host "Starting the application..." -ForegroundColor White
Write-Host ""

$htmlFile = Join-Path $PSScriptRoot "نظام-إدارة-مصنع-الأسمدة.html"
Start-Process $htmlFile

Write-Host "تم فتح النظام في المتصفح" -ForegroundColor Green
Write-Host "Application opened in browser" -ForegroundColor Green
Write-Host ""
Read-Host "اضغط Enter للخروج / Press Enter to exit"