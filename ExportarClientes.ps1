$ScriptPath = $PSScriptRoot  # Directory where the script is located

Write-Host "-> Exporting users"
Set-Location $ScriptPath\database\
Start-Process -NoNewWindow -FilePath "node" -ArgumentList ".\src\exportToExcel.js"