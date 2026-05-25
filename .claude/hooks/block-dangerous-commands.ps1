$ErrorActionPreference = "SilentlyContinue"

# stdin에서 PreToolUse 이벤트 JSON 읽기
$data = $null
if ([Console]::IsInputRedirected) {
    $raw = [Console]::In.ReadToEnd()
    if ($raw) { try { $data = $raw | ConvertFrom-Json } catch {} }
}

$command = ""
if ($data -and $data.tool_input -and $data.tool_input.PSObject.Properties["command"]) {
    $command = $data.tool_input.command
}
if (-not $command) { exit 0 }

# 위험 패턴 목록 — { Pattern: regex, Reason: string }
$dangerousPatterns = @(
    @{ Pattern = 'rm\s+(-rf|-fr)\s+/';        Reason = "루트 디렉토리 강제 삭제" }
    @{ Pattern = 'rm\s+(-rf|-fr)\s+~';        Reason = "홈 디렉토리 강제 삭제" }
    @{ Pattern = 'rm\s+(-rf|-fr)\s+\*';       Reason = "현재 디렉토리 전체 강제 삭제" }
    @{ Pattern = 'git\s+push\b.*--force(?!-with-lease)'; Reason = "Git 강제 푸시 (--force)" }
    @{ Pattern = 'git\s+push\b.*\s-f\b';      Reason = "Git 강제 푸시 (-f)" }
    @{ Pattern = 'git\s+reset\s+--hard\s+HEAD~'; Reason = "커밋 이력 삭제 (reset --hard HEAD~)" }
    @{ Pattern = '\bdd\s+if=';                Reason = "디스크 직접 쓰기 (dd)" }
    @{ Pattern = '\bmkfs\b';                  Reason = "파일시스템 포맷 (mkfs)" }
    @{ Pattern = '(?i)Remove-Item\b.*(C:\\\\|C:/)(?!Users)'; Reason = "C드라이브 루트 강제 삭제" }
    @{ Pattern = '(?i)\bFormat-Volume\b';     Reason = "볼륨 포맷 (Format-Volume)" }
)

foreach ($entry in $dangerousPatterns) {
    if ($command -match $entry.Pattern) {
        Write-Output "차단: 위험한 명령어가 감지되었습니다."
        Write-Output "사유: $($entry.Reason)"
        Write-Output "명령어: $command"
        exit 2
    }
}

exit 0
