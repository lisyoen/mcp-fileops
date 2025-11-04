/**
 * read_file - 파일 내용을 읽어오는 MCP tool
 * 
 * 지정된 경로의 파일을 UTF-8로 읽어 내용을 반환합니다.
 */

import { safeRead, exists } from '../utils/fs-utils.js';

interface ReadFileArgs {
  path: string;
}

export default async function readFile(args: ReadFileArgs) {
  const { path } = args;

  if (!path) {
    throw new Error('파일 경로가 필요합니다.');
  }

  if (!(await exists(path))) {
    throw new Error(`파일을 찾을 수 없습니다: ${path}`);
  }

  const content = await safeRead(path);
  
  return {
    content: [
      {
        type: 'text',
        text: content
      }
    ]
  };
}
