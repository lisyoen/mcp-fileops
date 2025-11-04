#!/usr/bin/env node

/**
 * mcp-fileops - MCP Server for Local File Operations
 * 
 * 로컬 파일 시스템 작업을 위한 MCP 서버입니다.
 * VSCode 연동 기능도 포함되어 있습니다.
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

// Tools import
import readFile from './tools/read_file.js';
import writeToFile from './tools/write_to_file.js';
import appendToFile from './tools/append_to_file.js';
import listDirectory from './tools/list_directory.js';
import deleteFile from './tools/delete_file.js';
import openFileVSCode from './tools/open_file_vscode.js';

// MCP 서버 생성
const server = new Server(
  {
    name: 'mcp-fileops',
    version: '0.1.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Tool 정의
const tools = [
  {
    name: 'read_file',
    description: '파일의 내용을 UTF-8로 읽어옵니다.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '읽을 파일의 경로',
        },
      },
      required: ['path'],
    },
    handler: readFile,
  },
  {
    name: 'write_to_file',
    description: '파일에 내용을 씁니다 (기존 내용 덮어쓰기).',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '쓸 파일의 경로',
        },
        content: {
          type: 'string',
          description: '파일에 쓸 내용',
        },
      },
      required: ['path', 'content'],
    },
    handler: writeToFile,
  },
  {
    name: 'append_to_file',
    description: '파일 끝에 내용을 추가합니다. 파일이 없으면 새로 생성합니다.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '내용을 추가할 파일의 경로',
        },
        content: {
          type: 'string',
          description: '추가할 내용',
        },
      },
      required: ['path', 'content'],
    },
    handler: appendToFile,
  },
  {
    name: 'list_directory',
    description: '디렉토리 내의 파일과 폴더 목록을 조회합니다.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '조회할 디렉토리 경로',
        },
      },
      required: ['path'],
    },
    handler: listDirectory,
  },
  {
    name: 'delete_file',
    description: '파일을 삭제합니다.',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: '삭제할 파일의 경로',
        },
      },
      required: ['path'],
    },
    handler: deleteFile,
  },
  {
    name: 'open_file_vscode',
    description: 'VSCode에서 파일을 엽니다 (Windows 전용).',
    inputSchema: {
      type: 'object',
      properties: {
        path: {
          type: 'string',
          description: 'VSCode에서 열 파일의 경로',
        },
      },
      required: ['path'],
    },
    handler: openFileVSCode,
  },
];

// List tools handler
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: tools.map((tool) => ({
    name: tool.name,
    description: tool.description,
    inputSchema: tool.inputSchema,
  })),
}));

// Call tool handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const tool = tools.find((t) => t.name === name);
  if (!tool) {
    throw new Error(`Unknown tool: ${name}`);
  }

  try {
    return await tool.handler(args as any);
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${(error as Error).message}`,
        },
      ],
      isError: true,
    };
  }
});

// 서버 시작
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('mcp-fileops server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
