@echo off
echo ========================================
echo    HireHub Job Portal - Startup Script
echo ========================================
echo.

echo Starting Backend Server...
echo.
cd backend
start "HireHub Backend" cmd /k "echo Starting Backend Server... && npm start"
cd ..

echo.
echo Starting Frontend Server...
echo.
cd frontend
start "HireHub Frontend" cmd /k "echo Starting Frontend Server... && npm run dev"
cd ..

echo.
echo ========================================
echo Both servers are starting...
echo.
echo Backend will be available at: http://localhost:5000
echo Frontend will be available at: http://localhost:5173 (or similar)
echo.
echo Please wait a few moments for servers to start.
echo ========================================
echo.
echo Press any key to exit this window...
pause > nul 