@echo off
title Leadscrapper By Scalvexa - Install
echo.
echo  Leadscrapper By Scalvexa is a Chrome EXTENSION (not a .exe app).
echo.
echo  1) This script will open chrome://extensions
echo  2) Turn ON Developer mode (top-right)
echo  3) Click "Load unpacked"
echo  4) Select this folder:
echo     %~dp0leadscrapper-extension-v1.2.0
echo.
echo  Opening Chrome extensions page...
start "" "chrome://extensions"
echo.
pause
