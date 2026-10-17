@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
    echo Node.js 22.13 ba tar porer version install korte hobe.
    pause
    exit /b 1
)

if not exist data mkdir data
if not exist data\admin-token.txt (
    for /f "delims=" %%T in ('powershell.exe -NoProfile -Command "$b = New-Object byte[] 32; [System.Security.Cryptography.RandomNumberGenerator]::Create().GetBytes($b); [Convert]::ToBase64String($b)"') do >data\admin-token.txt echo %%T
)
set /p ADMIN_TOKEN=<data\admin-token.txt
if "%ADMIN_TOKEN%"=="" (
    echo Local import token could not be created. Check that PowerShell is available.
    pause
    exit /b 1
)

set "PORT=4181"
echo Siraji Faraid is starting...
echo Open http://127.0.0.1:4181
echo The local import token is saved in data\admin-token.txt.
echo Press Ctrl+C to stop the server.
node server.mjs
pause
