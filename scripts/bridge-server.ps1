#!/usr/bin/env pwsh
# 🌉 HTTP Bridge Server - Connects two VS Code workspaces

param(
    [int]$Port = 9999
)

Write-Host "🌉 Starting HTTP Bridge Server on port $Port..." -ForegroundColor Cyan

# Simple HTTP listener
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
    $listener.Start()
    Write-Host "✅ Bridge server running at: http://localhost:$Port" -ForegroundColor Green
    Write-Host "📋 In the other workspace terminal, run:" -ForegroundColor Cyan
    Write-Host "   pwsh -File scripts/bridge-client.ps1" -ForegroundColor Yellow
    Write-Host ""
    
    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response
        
        $timestamp = Get-Date -Format 'HH:mm:ss'
        
        if ($request.HttpMethod -eq 'GET' -and $request.Url.LocalPath -eq '/ping') {
            Write-Host "📨 [$timestamp] PING from client" -ForegroundColor Green
            
            $responseString = @{
                status  = "connected"
                server  = "3000studios-next"
                time    = $timestamp
                message = "Bridge is active ✅"
            } | ConvertTo-Json
            
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($responseString)
            $response.ContentLength64 = $buffer.Length
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
        }
        elseif ($request.HttpMethod -eq 'POST' -and $request.Url.LocalPath -eq '/message') {
            $reader = New-Object System.IO.StreamReader($request.InputStream)
            $body = $reader.ReadToEnd()
            $reader.Close()
            
            Write-Host "📬 [$timestamp] MESSAGE: $body" -ForegroundColor Cyan
            
            $responseString = @{
                status = "received"
                echo   = $body
                time   = $timestamp
            } | ConvertTo-Json
            
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($responseString)
            $response.ContentLength64 = $buffer.Length
            $response.ContentType = "application/json"
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            $response.Close()
        }
        else {
            $response.StatusCode = 404
            $response.Close()
        }
    }
}
catch {
    if ($_.Exception.Message -like "*Access is denied*") {
        Write-Host "❌ Port $Port is already in use or access denied" -ForegroundColor Red
        Write-Host "💡 Try: Stop-Process -Name pwsh -Force" -ForegroundColor Yellow
    }
    else {
        Write-Host "❌ Error: $_" -ForegroundColor Red
    }
}
finally {
    $listener.Stop()
    Write-Host "🔌 Bridge server stopped" -ForegroundColor Yellow
}
