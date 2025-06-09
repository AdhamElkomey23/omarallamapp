@echo off
title Al-Wasiloon Factory Management - Starting Application
color 0A

echo.
echo ================================================
echo  Al-Wasiloon Fertilizer Factory Management
echo  Starting Desktop Application...
echo ================================================
echo.

REM Check if HTML file exists
if not exist "Al-Wasiloon-Factory-Management.html" (
    echo Error: Application file not found!
    echo Please ensure all files are extracted properly.
    pause
    exit /b 1
)

echo Starting Al-Wasiloon Factory Management System...
echo.

REM Launch the HTML application
start "" "Al-Wasiloon-Factory-Management.html"

echo Application launched successfully!
echo.
echo The Al-Wasiloon Factory Management System is now running
echo as a standalone desktop application.
echo.
echo You can close this window safely.
echo.
pause