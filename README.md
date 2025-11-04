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
git clone https://github.com/<yourname>/mcp-fileops.git
cd mcp-fileops
npm install
```

빌드 및 실행 (TypeScript → JavaScript 변환 후 MCP로 로드):

```bash
npm run build
```

---

## ⚙️ Tool Examples

### 📖 Read a file
```json
{
  "name": "read_file",
  "arguments": {
    "path": "D:\\git\\project\\README.md"
  }
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

### 🧭 Open a file in VSCode
```json
{
  "name": "open_file_vscode",
  "arguments": {
    "path": "D:\\git\\project\\output.txt"
  }
}
```

---

## 🧠 Design Notes

- **Language:** TypeScript (Node.js)  
- **File System API:** `fs/promises`  
- **Process Execution:** `child_process.exec`  
- **Cross-Platform:** Windows 중심 (VSCode PowerShell 명령 사용), Linux/Mac 지원 예정  

---

## 🪪 License

This project is licensed under the **MIT License**.

---

## 👤 Author

Developed by **Changyeon Lee (lisyoen)**  
For use with `mcp-websearch`, `mcp-fileops`, and integrated LLM-based development tools.
