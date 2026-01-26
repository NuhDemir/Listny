@echo off
echo Starting Backend...
start "Backend" cmd /k "cd backend && npm run dev"

echo Starting Frontend...
start "Frontend" cmd /k "cd frontend && npm run dev"

echo Both services are starting in separate windows.
