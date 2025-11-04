# 🧩 mcp-fileops

A Multi-Capability Provider (MCP) for local file operations such as reading, writing, appending, deleting, listing, and opening files directly in the IDE.

로컬 파일을 읽고, 쓰고, 탐색하며 VSCode에서 바로 열 수 있도록 도와주는 MCP입니다.  
`mcp-websearch`와 동일한 구조로, Copilot / Continue / Cline 등의 LLM 환경에서 파일 입출력 및 관리 기능을 제공합니다.

---

## 🚀 Features

| Tool | Description | 주요 기능 |
|------|--------------|------------|
| `read_file` | Reads the content of a specified file. | 지정된 파일의 내용을 읽어 반환 |
| `write_to_file` | Writes content to a file (overwrites existing). | 지정된 파일에 내용을 덮어쓰기 |
| `append_to_file` | Appends text to the end of a file. | 기존 파일 끝에 텍스트 추가 |
| `list_directory` | Lists files and folders in a directory. | 디렉터리 내 파일/폴더 목록 반환 |
| `delete_file` | Deletes a specified file. | 파일 삭제 |
| `open_file_vscode` | Opens a file in VSCode using PowerShell. | VSCode에서 파일을 바로 열기 |

---

## 📁 Project Structure

```
mcp-fileops/
├── src/
│   ├── index.ts                # MCP entrypoint (tool registration)
│   ├── tools/
│   │   ├── read_file.ts
│   │   ├── write_to_file.ts
│   │   ├── append_to_file.ts
│   │   ├── list_directory.ts
│   │   ├── delete_file.ts
│   │   └── open_file_vscode.ts
│   └── utils/
│       └── fs-utils.ts
├── package.json
├── README.md
├── .gitignore
└── LICENSE
```

---

## 🛠️ Installation

```bash
git clone https://github.com/lisyoen/mcp-fileops.git
cd mcp-fileops
npm install
npm run build
```

---

## 📝 VSCode MCP 등록 방법

### 1. VSCode의 `mcp.json` 설정 파일 열기
- Windows: `%APPDATA%\Code\User\mcp.json`
- Mac/Linux: `~/.config/Code/User/mcp.json`

### 2. `mcp-fileops` 서버 추가

```json
{
  "mcpServers": {
    "mcp-fileops": {
      "command": "node",
      "args": ["D:\\git\\mcp-fileops\\build\\index.js"]
    }
  }
}
```

**주의사항:**
- `args` 경로는 본인의 프로젝트 절대 경로로 수정
- Windows에서는 백슬래시를 이스케이프 (`\\`) 또는 슬래시 (`/`) 사용
- 빌드 후 생성되는 `build/index.js` 경로를 정확히 입력

### 3. VSCode 재시작
설정을 저장하고 VSCode를 재시작하면 MCP 서버가 활성화됩니다.

### 4. 작동 확인
Copilot Chat에서 다음과 같이 테스트:
```
D:\test\example.txt 파일을 읽어줘
```

---

## ⚙️ Tool Usage Examples

### 📖 Read a file
```json
{
  "name": "read_file",
  "arguments": {
    "path": "D:\\git\\project\\README.md"
  }
}
```

**Response:**
```json
{
  "content": "파일 내용이 여기에 표시됩니다..."
}
```

### 💾 Write to a file
```json
{
  "name": "write_to_file",
  "arguments": {
    "path": "D:\\git\\project\\output.txt",
    "content": "Hello from MCP FileOps!"
  }
}
```

**Response:**
```json
{
  "success": true,
  "path": "D:\\git\\project\\output.txt"
}
```

### ➕ Append to a file
```json
{
  "name": "append_to_file",
  "arguments": {
    "path": "D:\\git\\project\\log.txt",
    "content": "\n[2025-11-05] New log entry"
  }
}
```

### 📂 List directory contents
```json
{
  "name": "list_directory",
  "arguments": {
    "path": "D:\\git\\project"
  }
}
```

**Response:**
```json
{
  "items": [
    { "name": "src/", "type": "directory" },
    { "name": "package.json", "type": "file" },
    { "name": "README.md", "type": "file" }
  ]
}
```

### 🗑️ Delete a file
```json
{
  "name": "delete_file",
  "arguments": {
    "path": "D:\\git\\project\\temp.txt"
  }
}
```

### 🧭 Open a file in VSCode
```json
{
  "name": "open_file_vscode",
  "arguments": {
    "path": "D:\\git\\project\\output.txt"
  }
}
```

이 명령은 PowerShell을 통해 VSCode에서 파일을 직접 열어줍니다.

---

## 💡 Usage Tips

### 1. 작업 영역 외부 파일 접근
작업 영역(workspace) 밖의 파일도 자유롭게 읽고 쓸 수 있습니다:
```
Copilot: "D:\다른프로젝트\config.json 파일을 읽어서 분석해줘"
```

### 2. 파일 생성 후 자동으로 열기
파일을 생성하거나 수정한 후 바로 VSCode에서 확인하고 싶다면:
```
Copilot: "D:\output\result.txt에 결과를 저장하고 VSCode에서 열어줘"
```
→ `write_to_file` 후 `open_file_vscode`를 자동으로 실행

### 3. 로그 파일 관리
기존 로그 파일에 계속 내용 추가:
```
Copilot: "D:\logs\app.log에 오늘 날짜와 함께 에러 메시지를 추가해줘"
```
→ `append_to_file` 사용

### 4. 디렉토리 탐색
특정 폴더의 구조를 파악:
```
Copilot: "D:\projects 폴더에 뭐가 있는지 보여줘"
```
→ `list_directory` 사용

---

## 🧠 Design Notes

- **Language:** TypeScript (Node.js)  
- **File System API:** `fs/promises` (비동기 처리)
- **Process Execution:** `child_process.exec` (VSCode 실행용)
- **Error Handling:** 파일이 없거나 권한 문제 시 명확한 에러 메시지 반환
- **Cross-Platform:** 
  - Windows 완전 지원 (PowerShell 기반)
  - Linux/Mac 지원 예정 (VSCode 경로 자동 탐지 기능 추가 필요)

---

## 🔧 Development

### 빌드
```bash
npm run build
```

### 개발 모드 (watch)
```bash
npm run watch
```

### 테스트
```bash
# 파일 읽기 테스트
node build/index.js
```

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## 👤 Author

Developed by **Changyeon Lee (lisyoen)**  
For use with `mcp-websearch`, `mcp-fileops`, and integrated LLM-based development tools.

**GitHub:** [https://github.com/lisyoen/mcp-fileops](https://github.com/lisyoen/mcp-fileops)
