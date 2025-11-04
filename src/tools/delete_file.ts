/**
 * delete_file - 파일을 삭제하는 MCP tool
 * 
 * 지정된 경로의 파일을 삭제합니다.
 */

import { unlink } from 'fs/promises';
import { resolve } from 'path';
import { exists } from '../utils/fs-utils.js';

interface DeleteFileArgs {
  path: string;
}

export default async function deleteFile(args: DeleteFileArgs) {
  const { path } = args;

  if (!path) {
    throw new Error('파일 경로가 필요합니다.');
  }

  const absolutePath = resolve(path);
  
  if (!(await exists(absolutePath))) {
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: true, message: '파일이 존재하지 않습니다.', path })
        }
      ]
    };
  }

  try {
    await unlink(absolutePath);
    
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify({ success: true, path })
        }
      ]
    };
  } catch (error) {
    throw new Error(`파일 삭제 실패: ${path} - ${(error as Error).message}`);
  }
}
