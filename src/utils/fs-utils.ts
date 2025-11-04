/**
 * 파일 시스템 작업을 위한 공통 유틸리티 함수
 */

import { access, readFile, writeFile, stat, readdir } from 'fs/promises';
import { constants } from 'fs';
import { resolve } from 'path';

/**
 * 파일 또는 디렉토리가 존재하는지 확인
 */
export async function exists(path: string): Promise<boolean> {
  try {
    await access(path, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * 파일을 안전하게 읽기 (UTF-8)
 */
export async function safeRead(path: string): Promise<string> {
  try {
    const absolutePath = resolve(path);
    const content = await readFile(absolutePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`파일 읽기 실패: ${path} - ${(error as Error).message}`);
  }
}

/**
 * 파일에 안전하게 쓰기 (UTF-8)
 */
export async function safeWrite(path: string, content: string): Promise<void> {
  try {
    const absolutePath = resolve(path);
    await writeFile(absolutePath, content, 'utf-8');
  } catch (error) {
    throw new Error(`파일 쓰기 실패: ${path} - ${(error as Error).message}`);
  }
}

/**
 * 파일에 내용 추가 (UTF-8)
 */
export async function safeAppend(path: string, content: string): Promise<void> {
  try {
    const absolutePath = resolve(path);
    let existing = '';
    
    if (await exists(absolutePath)) {
      existing = await readFile(absolutePath, 'utf-8');
    }
    
    await writeFile(absolutePath, existing + content, 'utf-8');
  } catch (error) {
    throw new Error(`파일 추가 실패: ${path} - ${(error as Error).message}`);
  }
}

/**
 * 파일 또는 디렉토리 정보 조회
 */
export async function getFileInfo(path: string) {
  try {
    const absolutePath = resolve(path);
    const stats = await stat(absolutePath);
    
    return {
      name: path.split(/[/\\]/).pop() || path,
      type: stats.isDirectory() ? 'directory' : 'file',
      size: stats.size,
      modified: stats.mtime.toISOString()
    };
  } catch (error) {
    throw new Error(`파일 정보 조회 실패: ${path} - ${(error as Error).message}`);
  }
}

/**
 * 디렉토리 내 파일/폴더 목록 조회
 */
export async function listDirectory(path: string) {
  try {
    const absolutePath = resolve(path);
    const entries = await readdir(absolutePath, { withFileTypes: true });
    
    const items = await Promise.all(
      entries.map(async (entry) => {
        const fullPath = resolve(absolutePath, entry.name);
        const stats = await stat(fullPath);
        
        return {
          name: entry.name,
          type: entry.isDirectory() ? 'directory' : 'file',
          size: stats.size,
          modified: stats.mtime.toISOString()
        };
      })
    );
    
    return items;
  } catch (error) {
    throw new Error(`디렉토리 목록 조회 실패: ${path} - ${(error as Error).message}`);
  }
}
