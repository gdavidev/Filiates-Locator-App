Write-Host "-> Initializing servers"
Set-Location $ScriptPath
$serverJob = Start-Job -ScriptBlock { npm run start }

# Wait a moment for the server to start
Start-Sleep -Seconds 5

# Open default browser
Write-Host "-> Application at http://localhost:3000"
Start-Process "http://localhost:3000"

Wait-Job $serverJob