# MCP 서버를 VSCode settings.json에 등록하는 스크립트

$settingsPath = "$env:APPDATA\Code\User\settings.json"

Write-Host "🔍 VSCode 설정 파일 읽는 중: $settingsPath"

# 설정 파일 읽기
$jsonContent = Get-Content $settingsPath -Raw -Encoding UTF8

# JSON 파싱
$settings = $jsonContent | ConvertFrom-Json

# github.copilot.chat.mcp.servers 속성이 없으면 생성
if (-not (Get-Member -InputObject $settings -Name "github.copilot.chat.mcp.servers" -MemberType Properties)) {
    $settings | Add-Member -MemberType NoteProperty -Name "github.copilot.chat.mcp.servers" -Value ([PSCustomObject]@{})
}

# mcp-fileops 서버 추가
$mcpFileops = [PSCustomObject]@{
    command = "node"
    args = @("D:/git/mcp-fileops/dist/index.js")
}

$settings."github.copilot.chat.mcp.servers" | Add-Member -MemberType NoteProperty -Name "mcp-fileops" -Value $mcpFileops -Force

# JSON으로 변환 후 저장
$settings | ConvertTo-Json -Depth 100 | Set-Content $settingsPath -Encoding UTF8

Write-Host "✅ MCP 서버 'mcp-fileops' 등록 완료!"
Write-Host ""
Write-Host "📋 등록된 설정:"
Write-Host "  - 서버 이름: mcp-fileops"
Write-Host "  - 명령: node"
Write-Host "  - 경로: D:/git/mcp-fileops/dist/index.js"
Write-Host ""
Write-Host "⚡ VSCode를 재시작하면 MCP 서버가 활성화됩니다."
