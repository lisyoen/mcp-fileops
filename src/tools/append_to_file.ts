/**
 * append_to_file - 파일에 내용을 추가하는 MCP tool
 * 
 * 지정된 경로의 파일 끝에 텍스트를 추가합니다.
 * 파일이 없으면 새로 생성합니다.
 */

import { safeAppend } from '../utils/fs-utils.js';

interface AppendToFileArgs {
  path: string;
  content: string;
}

export default async function appendToFile(args: AppendToFileArgs) {
  const { path, content } = args;

  if (!path) {
    throw new Error('파일 경로가 필요합니다.');
  }

  if (content === undefined || content === null) {
    throw new Error('추가할 내용이 필요합니다.');
  }

  await safeAppend(path, content);
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify({ success: true, path })
      }
    ]
  };
}
