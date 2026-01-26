@echo off
echo ========================================
echo   Database Seed Script
echo ========================================
echo.
echo This will clear all existing songs and albums
echo and add sample data to your database.
echo.
pause

cd /d "%~dp0"

echo.
echo Running seed script...
echo.

npm run seed

echo.
echo ========================================
echo   Seed Complete!
echo ========================================
echo.
echo You can now:
echo   1. Start the backend: npm run dev
echo   2. View the data in your app
echo.
pause
