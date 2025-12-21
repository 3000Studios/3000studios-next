#!/usr/bin/env pwsh
# 🔗 Workspace Connector - Paste this in the other VS Code terminal

Write-Host "🔗 Connecting to main workspace..." -ForegroundColor Cyan

# Connect to the main workspace pipe
$pipeName = "3000Studios-Bridge"
$pipeClient = New-Object System.IO.Pipes.NamedPipeClientStream ".", $pipeName

try {
    Write-Host "⏳ Attempting connection..." -ForegroundColor Yellow
    $pipeClient.Connect(5000)  # 5 second timeout
    
    $reader = New-Object System.IO.StreamReader $pipeClient
    $writer = New-Object System.IO.StreamWriter $pipeClient
    $writer.AutoFlush = $true
    
    Write-Host "✅ Connected to main workspace!" -ForegroundColor Green
    Write-Host "📡 Bridge active at: \\.\pipe\$pipeName" -ForegroundColor Cyan
    
    # Send initial handshake
    $writer.WriteLine("CONNECTED:$(Get-Location)")
    
    # Keep connection alive and listen
    while ($true) {
        if ($pipeClient.IsConnected) {
            $message = $reader.ReadLine()
            if ($message) {
                Write-Host "📨 Received: $message" -ForegroundColor Green
                
                # Echo response
                $writer.WriteLine("ACK:$message")
            }
        }
        else {
            break
        }
        Start-Sleep -Milliseconds 100
    }
}
catch {
    Write-Host "❌ Connection failed: $_" -ForegroundColor Red
    Write-Host "💡 Make sure the main workspace bridge is running" -ForegroundColor Yellow
}
finally {
    $pipeClient.Dispose()
}
