/**
 * list_directory - 디렉토리 내용을 조회하는 MCP tool
 * 
 * 지정된 디렉토리 내의 파일과 폴더 목록을 반환합니다.
 */

import { listDirectory as listDir, exists } from '../utils/fs-utils.js';

interface ListDirectoryArgs {
  path: string;
}

export default async function listDirectory(args: ListDirectoryArgs) {
  const { path } = args;

  if (!path) {
    throw new Error('디렉토리 경로가 필요합니다.');
  }

  if (!(await exists(path))) {
    throw new Error(`디렉토리를 찾을 수 없습니다: ${path}`);
  }

  const items = await listDir(path);
  
  return {
    content: [
      {
        type: 'text',
        text: JSON.stringify(items, null, 2)
      }
    ]
  };
}
