# Step 12: Test full message flow

# Get session token
$sessionResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/session/start" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"tags":["Placements"]}' `
  -UseBasicParsing

$sessionData = $sessionResponse.Content | ConvertFrom-Json
$token = $sessionData.token
$sessionId = $sessionData.sessionId

Write-Host "Session created:"
Write-Host "Token: $token"
Write-Host "Session ID: $sessionId"
Write-Host ""

# Test safe message
Write-Host "--- Test 1: Safe message ---"
$safeResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/chat/message" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body "{`"text`":`"I am stressed about placements`",`"sessionId`":`"$sessionId`"}" `
  -UseBasicParsing

Write-Host $safeResponse.Content

Write-Host ""
Write-Host "--- Test 2: Emergency message ---"
$emergencyResponse = Invoke-WebRequest -Uri "http://localhost:5000/api/chat/message" `
  -Method POST `
  -ContentType "application/json" `
  -Headers @{"Authorization" = "Bearer $token"} `
  -Body "{`"text`":`"I want to kill myself`",`"sessionId`":`"$sessionId`"}" `
  -UseBasicParsing

Write-Host $emergencyResponse.Content
