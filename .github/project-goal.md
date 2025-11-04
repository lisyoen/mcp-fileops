📘 **Copilot 프롬프트**

프로젝트 개요:
이 리포지토리는 `mcp-fileops`라는 Multi-Capability Provider(MCP)로,
로컬 파일 입출력 및 VSCode 연동을 지원합니다.
Node.js(TypeScript) 기반이며, MIT 라이선스를 따릅니다.

구현 목표:
아래 tool들을 `src/tools/` 디렉터리에 각각 TypeScript 파일로 구현해 주세요.
모든 tool은 `export default async function` 형태로 작성하고,
각 tool은 JSON schema 기반의 인자 검증과 파일 시스템 접근을 수행해야 합니다.

구현할 MCP tool 목록:

1️⃣ **read_file**
- 입력: { path: string }
- 동작: 지정된 파일 경로의 텍스트 내용을 UTF-8로 읽어 반환
- 에러: 파일이 없거나 읽기 실패 시 메시지 반환

2️⃣ **write_to_file**
- 입력: { path: string, content: string }
- 동작: 지정된 파일에 내용을 UTF-8로 저장 (기존 내용 덮어쓰기)
- 성공 시: { success: true } 반환

3️⃣ **append_to_file**
- 입력: { path: string, content: string }
- 동작: 지정된 파일 끝에 텍스트를 추가
- 파일이 없으면 새로 생성

4️⃣ **list_directory**
- 입력: { path: string }
- 동작: 디렉터리 내 파일/폴더 목록을 배열로 반환
- 결과 예시: [{ name, type, size, modified }]

5️⃣ **open_file_vscode**
- 입력: { path: string }
- 동작: PowerShell 명령을 사용해 Code.exe를 통해 파일을 VSCode에서 엶
  ```powershell
  & "$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe" "<path>"
  ```

6️⃣ **delete_file**
- 입력: { path: string }
- 동작: 지정된 파일을 삭제
- 에러 처리: 없는 파일이면 무시 또는 경고 반환

추가 요구사항:
- 공통 파일 `src/utils/fs-utils.ts`에 fs 관련 공용 함수(`exists`, `safeRead`, `safeWrite` 등)를 만들어서 import 하세요.
- MCP entrypoint(`src/index.ts`)에서 모든 tool을 register 하는 코드 작성.
- TypeScript로 작성하고, 비동기(async/await) 기반으로 구현하세요.
- 각 tool 파일 상단에 JSDoc 주석으로 간단한 설명 추가.

출력 형식:
- 디렉터리 구조 예시
- 각 tool 파일 코드
- index.ts의 tool 등록 코드 예시
