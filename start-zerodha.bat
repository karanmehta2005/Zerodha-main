@echo off
echo ========================================================
echo        Zerodha Full-Stack Developmental Script
echo ========================================================
echo.
echo [1/4] Terminating any old servers to clear port conflicts...
taskkill /IM node.exe /F 2>nul

echo.
echo [2/4] Starting Backend (Port 3003)...
start cmd /k "cd backend && npm start"

echo.
echo [3/4] Starting Frontend (Port 3000)...
start cmd /k "cd frontend && npm start"

echo.
echo [4/4] Starting Dashboard (Port 3004)...
start cmd /k "cd dashboard && npm start"

echo.
echo All three servers are booting up in separate background windows!
echo You can safely close this orchestrator window.
