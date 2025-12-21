#!/usr/bin/env pwsh
# 🔗 Bridge Client - Connects to the main workspace

param(
    [string]$ServerUrl = "http://localhost:9999"
)

Write-Host "🔗 Connecting to bridge server at $ServerUrl..." -ForegroundColor Cyan

function Test-Bridge {
    try {
        $response = Invoke-RestMethod -Uri "$ServerUrl/ping" -Method Get -TimeoutSec 2
        return $response
    }
    catch {
        return $null
    }
}

# Test connection
Write-Host "⏳ Testing connection..." -ForegroundColor Yellow

$connection = Test-Bridge
if ($connection) {
    Write-Host "✅ Connected to main workspace!" -ForegroundColor Green
    Write-Host "📡 Bridge status: $($connection.status)" -ForegroundColor Cyan
    Write-Host "🏢 Server: $($connection.server)" -ForegroundColor Cyan
    Write-Host "⏰ Time: $($connection.time)" -ForegroundColor Cyan
    Write-Host ""
    Write-Host $connection.message -ForegroundColor Green
    Write-Host ""
    
    # Keep connection alive with periodic pings
    Write-Host "🔄 Keeping connection alive (Ctrl+C to stop)..." -ForegroundColor Yellow
    
    $pingCount = 0
    while ($true) {
        Start-Sleep -Seconds 5
        $pingCount++
        
        try {
            $ping = Invoke-RestMethod -Uri "$ServerUrl/ping" -Method Get -TimeoutSec 2
            Write-Host "💚 Ping #$pingCount - Bridge active at $($ping.time)" -ForegroundColor Green
        }
        catch {
            Write-Host "❌ Connection lost!" -ForegroundColor Red
            break
        }
    }
}
else {
    Write-Host "❌ Cannot connect to bridge server" -ForegroundColor Red
    Write-Host "💡 Make sure the server is running in the main workspace:" -ForegroundColor Yellow
    Write-Host "   pwsh -File scripts/bridge-server.ps1" -ForegroundColor Cyan
}
