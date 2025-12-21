# Bridge Client
# Connects to the HTTP Bridge Server

$ServerUrl = "http://localhost:9999"

Write-Host "🔗 Connecting to Bridge Server at $ServerUrl..." -ForegroundColor Cyan

while ($true) {
    try {
        $response = Invoke-RestMethod -Uri "$ServerUrl/ping" -Method Post -Body @{ client = "3000Studios-next"; status = "connected" } -ErrorAction Stop
        Write-Host "✅ Connected: $($response.message)" -ForegroundColor Green
    }
    catch {
        Write-Host "❌ Connection failed: $_" -ForegroundColor Red
        Write-Host "   (Retrying in 5 seconds...)" -ForegroundColor Gray
    }
    Start-Sleep -Seconds 5
}
}
