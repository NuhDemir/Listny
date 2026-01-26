@echo off
echo ========================================
echo   Enhanced Database Seed Script (V2)
echo ========================================
echo.
echo This will ADD new data WITHOUT deleting existing:
echo   - 10 Albums
echo   - 50 Songs
echo   - 5 Users (with test accounts)
echo   - User Libraries (favorites, playlists)
echo   - 10 Playlists
echo.
echo NOTE: Existing data from seed-v1 will be PRESERVED
echo.
pause

cd /d "%~dp0"

echo.
echo Running enhanced seed script...
echo.

npm run seed-v2

echo.
echo ========================================
echo   Seed Complete!
echo ========================================
echo.
echo Test Users Created:
echo   john@example.com / password123
echo   jane@example.com / password123
echo   mike@example.com / password123
echo   sarah@example.com / password123
echo   admin@example.com / admin123 (Admin)
echo.
echo You can now:
echo   1. Start the backend: npm run dev
echo   2. Login with any test user
echo   3. View library data
echo.
pause
