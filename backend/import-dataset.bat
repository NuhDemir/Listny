@echo off
echo ========================================
echo   Dataset Import Script
echo ========================================
echo.

echo [1/2] Installing csv-parser package...
call npm install csv-parser
echo.

echo [2/2] Running import script...
echo This will import 25,000 songs from dataset.csv
echo.
node src/scripts/import-dataset.js

echo.
echo ========================================
echo   Import Complete!
echo ========================================
pause
