#!/usr/bin/env pwsh
# 🌉 Workspace Bridge Server - Run this in the main workspace

Write-Host "🌉 Starting Workspace Bridge Server..." -ForegroundColor Cyan

$pipeName = "3000Studios-Bridge"
$pipe = New-Object System.IO.Pipes.NamedPipeServerStream($pipeName)

Write-Host "⏳ Waiting for connection on: \\.\pipe\$pipeName" -ForegroundColor Yellow
Write-Host "📋 In the other terminal, run: pwsh -File scripts/connect-workspaces.ps1" -ForegroundColor Cyan

try {
    $pipe.WaitForConnection()
    Write-Host "✅ Client connected!" -ForegroundColor Green
    
    $reader = New-Object System.IO.StreamReader $pipe
    $writer = New-Object System.IO.StreamWriter $pipe
    $writer.AutoFlush = $true
    
    # Send welcome message
    $writer.WriteLine("WELCOME:Bridge Active")
    
    # Communication loop
    while ($pipe.IsConnected) {
        $message = $reader.ReadLine()
        if ($message) {
            Write-Host "📨 Received: $message" -ForegroundColor Green
            
            # Send response
            $writer.WriteLine("SERVER:Message received at $(Get-Date -Format 'HH:mm:ss')")
        }
        Start-Sleep -Milliseconds 100
    }
}
catch {
    Write-Host "❌ Error: $_" -ForegroundColor Red
}
finally {
    $pipe.Dispose()
    Write-Host "🔌 Bridge closed" -ForegroundColor Yellow
}
