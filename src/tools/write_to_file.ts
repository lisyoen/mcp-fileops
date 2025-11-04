/**
 * write_to_file - 파일에 내용을 쓰는 MCP tool
 * 
 * 지정된 경로의 파일에 내용을 UTF-8로 저장합니다 (기존 내용 덮어쓰기).
 */

import { safeWrite } from '../utils/fs-utils.js';

interface WriteToFileArgs {
  path: string;
  content: string;
}

export default async function writeToFile(args: WriteToFileArgs) {
  const { path, content } = args;

  if (!path) {
    throw new Error('파일 경로가 필요합니다.');
  }

  if (content === undefined || content === null) {
    throw new Error('파일 내용이 필요합니다.');
  }

  await safeWrite(path, content);
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({ success: true, path })
      }
    ]
  };
}
