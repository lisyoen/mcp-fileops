/**
 * open_file_vscode - VSCode에서 파일을 여는 MCP tool
 * 
 * PowerShell 명령을 사용하여 지정된 파일을 VSCode에서 엽니다.
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve } from 'path';
import { exists } from '../utils/fs-utils.js';

const execAsync = promisify(exec);

interface OpenFileVSCodeArgs {
  path: string;
}

export default async function openFileVSCode(args: OpenFileVSCodeArgs) {
  const { path } = args;

  if (!path) {
    throw new Error('파일 경로가 필요합니다.');
  }

  const absolutePath = resolve(path);
  
  if (!(await exists(absolutePath))) {
    throw new Error(`파일을 찾을 수 없습니다: ${path}`);
  }

  try {
    // Windows에서 VSCode 실행 (PowerShell)
    const vscodePath = process.env.LOCALAPPDATA + '\\Programs\\Microsoft VS Code\\Code.exe';
    const command = `& "${vscodePath}" "${absolutePath}"`;
    
    await execAsync(command, { shell: 'powershell.exe' });
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: true, path: absolutePath })
        }
      ]
    };
  } catch (error) {
    throw new Error(`VSCode 실행 실패: ${(error as Error).message}`);
  }
}
