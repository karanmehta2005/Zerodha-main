@echo off
echo ========================================================
echo        Zerodha Production Boot Script
echo ========================================================
echo.
echo [1/2] Terminating any old servers to clear port conflicts...
taskkill /IM node.exe /F 2>nul

echo.
echo [2/2] Starting Unified Server (Port 3003)...
start cmd /k "cd backend && npm start"

echo.
echo The integrated backend server is booting up!
echo Automatically opening your browser...
start http://localhost:3003
echo.
echo You can safely close this orchestrator window.
