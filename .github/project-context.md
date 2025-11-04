# 프로젝트 컨텍스트

## 프로젝트 개요
- **이름**: mcp-fileops
- **목표**: MCP(Model Context Protocol) 기반 로컬 파일 작업 도구
- **타입**: MCP Server / File System Operations
- **언어**: TypeScript (Node.js)
- **위치**: D:\git\mcp-fileops

## 프로젝트 설명
Copilot / Continue / Cline 등 LLM 환경에서 파일 읽기/쓰기/관리 기능을 제공하는 MCP 서버입니다.

### 주요 기능
1. **read_file**: 파일 내용 읽기
2. **write_to_file**: 파일 쓰기 (덮어쓰기)
3. **append_to_file**: 파일에 텍스트 추가
4. **list_directory**: 디렉토리 목록 조회
5. **delete_file**: 파일 삭제
6. **open_file_vscode**: VSCode에서 파일 열기

## 개발 환경
- **Runtime**: Node.js 18+
- **Language**: TypeScript
- **Package Manager**: npm
- **File System API**: fs/promises
- **Target Platform**: Windows (PowerShell 명령 사용)

## 프로젝트 구조
```
mcp-fileops/
├── src/
│   ├── index.ts                # MCP entrypoint
│   ├── tools/                  # Tool implementations
│   └── utils/                  # Utility functions
├── package.json
├── tsconfig.json
└── .github/                    # 세션 관리 시스템
    ├── copilot-instructions.md
    ├── session-manager.md
    ├── current-session.md
    ├── project-context.md
    └── sessions/
```

## 코딩 스타일 및 컨벤션
- TypeScript strict mode 사용
- Async/Await 기반 비동기 처리
- 한국어 커밋 메시지 및 문서
- `.github/` 디렉토리를 통한 세션 관리

## 주요 의사결정 사항
1. **언어**: TypeScript (타입 안전성)
2. **MCP 프로토콜**: 표준 MCP SDK 활용
3. **파일 처리**: fs/promises로 비동기 처리
