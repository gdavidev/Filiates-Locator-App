$ScriptPath = $PSScriptRoot  # Directory where the script is located

Write-Host "-> Installing client dependencies"
Set-Location $ScriptPath\client\
npm install

Write-Host "-> Installing server dependencies"
Set-Location $ScriptPath\server\
npm install

Write-Host "-> Installing database importers dependencies"
Set-Location $ScriptPath\database\
npm install

Write-Host "-> Creating database from base-clientes-feicon.xlsx file"
node .\src\importToSqlite.js

Write-Host "-> Initializing servers"
Set-Location $ScriptPath
$serverJob = Start-Job -ScriptBlock { npm run start }

# Wait a moment for the server to start
Start-Sleep -Seconds 5

# Open default browser
Write-Host "-> Application at http://localhost:3000"
Start-Process "http://localhost:3000"

Wait-Job $serverJob