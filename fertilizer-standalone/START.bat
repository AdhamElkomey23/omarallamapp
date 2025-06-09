@echo off
title Al-Wasiloon Fertilizer Factory Management System
color 0A
echo.
echo ================================================
echo  Al-Wasiloon Fertilizer Factory Management
echo  Starting Application...
echo ================================================
echo.

REM Get the directory where the batch file is located
set "APP_DIR=%~dp0"
cd /d "%APP_DIR%"

REM Try Node.js first (most reliable)
echo Checking for Node.js...
node --version >nul 2>&1
if not errorlevel 1 (
    echo Starting Node.js server...
    node server.js
    goto :end
)

REM Try Python 3 as fallback
echo Node.js not found, trying Python...
python --version >nul 2>&1
if not errorlevel 1 (
    echo Starting Python server...
    python -m http.server 8080
    goto :end
)

REM Try Python 2 as final fallback  
python2 --version >nul 2>&1
if not errorlevel 1 (
    echo Starting Python 2 server...
    python2 -m SimpleHTTPServer 8080
    goto :end
)

REM If nothing works, show instructions
echo.
echo ================================================
echo  ERROR: No suitable server found
echo ================================================
echo.
echo Please install one of the following:
echo.
echo 1. Node.js (Recommended)
echo    Download from: https://nodejs.org
echo.
echo 2. Python 3
echo    Download from: https://python.org  
echo.
echo After installation, restart this application.
echo.
pause
exit /b 1

:end
echo.
echo Application stopped.
pause