$ScriptPath = $PSScriptRoot  # Directory where the script is located

Write-Host "-> Exporting users"
Set-Location $ScriptPath\database\
node .\src\exportToExcel.js

Read-Host -Prompt "Precione enter para sair"