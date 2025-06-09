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

REM Start the local HTTP server using Python
echo Starting local server...
cd /d "%APP_DIR%"

REM Try Python 3 first, then Python 2
python -m http.server 8080 >nul 2>&1
if errorlevel 1 (
    python -m SimpleHTTPServer 8080 >nul 2>&1
    if errorlevel 1 (
        echo Error: Python is not installed or not in PATH
        echo Please install Python from https://python.org
        pause
        exit /b 1
    )
) &

REM Wait a moment for server to start
timeout /t 3 /nobreak >nul

REM Open the application in default browser
echo Opening application in browser...
start http://localhost:8080

echo.
echo ================================================
echo  Application is now running!
echo  
echo  URL: http://localhost:8080
echo  
echo  Press CTRL+C to stop the server
echo  Or simply close this window
echo ================================================
echo.

REM Keep the window open
pause