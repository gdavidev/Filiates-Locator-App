$ScriptPath = $PSScriptRoot  # Directory where the script is located

Write-Host "-> Installing client dependencies"
Set-Location $ScriptPath\client\
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "install"

Write-Host "-> Installing server dependencies"
Set-Location $ScriptPath\server\
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "install"

Write-Host "-> Installing database importers dependencies"
Set-Location $ScriptPath\database\
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "install"

Write-Host "-> Creating database from base-clientes-feicon.xlsx file"
Start-Process -NoNewWindow -FilePath "node" -ArgumentList ".\src\importToSqlite.js"

Write-Host "-> Initializing servers"
Set-Location $ScriptPath
Start-Process -NoNewWindow -FilePath "npm" -ArgumentList "run start"

# Wait a moment for the server to start
Write-Host "-> Initializing application"
Start-Sleep -Seconds 3

# Open default browser
Write-Host "-> Application at http://localhost:3000"
Start-Process "http://localhost:3000"