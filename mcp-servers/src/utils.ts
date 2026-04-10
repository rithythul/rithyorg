#!/usr/bin/env node
/**
 * Utility MCP Server for Nimmit
 * Provides common tools: file operations, web requests, data processing
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { execSync } from 'child_process';
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'fs';
import { join, resolve } from 'path';

const BRAIN_DIR = process.env.NIMMIT_BRAIN || '/home/KOOMPI/.openclaw/nimmit';
const WORKSPACE_DIR = process.env.NIMMIT_WORKSPACE || '/home/KOOMPI/workspace';

const server = new McpServer({
  name: 'nimmit-utils',
  version: '1.0.0',
});

// Tool: Search brain files
server.tool(
  'brain_search',
  'Search for text in Nimmit brain files',
  {
    query: z.string().describe('Text to search for'),
    maxResults: z.number().optional().default(10).describe('Maximum results to return'),
  },
  async ({ query, maxResults = 10 }) => {
    try {
      const cmd = `grep -r -n -i "${query}" ${BRAIN_DIR} --include="*.md" 2>/dev/null | head -${maxResults}`;
      const result = execSync(cmd, { encoding: 'utf-8', maxBuffer: 10 * 1024 * 1024 });
      return {
        content: [{
          type: 'text',
          text: result || 'No matches found',
        }],
      };
    } catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${e.message}`,
        }],
        isError: true,
      };
    }
  }
);

// Tool: List projects
server.tool(
  'list_projects',
  'List all active projects in workspace',
  {},
  async () => {
    try {
      const dirs = readdirSync(WORKSPACE_DIR, { withFileTypes: true });
      const projects = dirs
        .filter(d => d.isDirectory() && !d.name.startsWith('.'))
        .map(d => d.name);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(projects, null, 2),
        }],
      };
    } catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${e.message}`,
        }],
        isError: true,
      };
    }
  }
);

// Tool: Get project status
server.tool(
  'project_status',
  'Get status of a specific project',
  {
    name: z.string().describe('Project name'),
  },
  async ({ name }) => {
    try {
      const projectPath = join(WORKSPACE_DIR, name);
      if (!existsSync(projectPath)) {
        return {
          content: [{
            type: 'text',
            text: `Project "${name}" not found`,
          }],
          isError: true,
        };
      }
      
      // Check for common project files
      const hasPackageJson = existsSync(join(projectPath, 'package.json'));
      const hasReadme = existsSync(join(projectPath, 'README.md'));
      const hasGit = existsSync(join(projectPath, '.git'));
      
      // Get last git activity if available
      let lastActivity = 'unknown';
      if (hasGit) {
        try {
          lastActivity = execSync(`cd "${projectPath}" && git log -1 --format="%ci" 2>/dev/null || echo "no commits"`, { encoding: 'utf-8' }).trim();
        } catch (e) {
          lastActivity = 'no git history';
        }
      }
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify({
            name,
            path: projectPath,
            hasPackageJson,
            hasReadme,
            hasGit,
            lastActivity,
          }, null, 2),
        }],
      };
    } catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${e.message}`,
        }],
        isError: true,
      };
    }
  }
);

// Tool: Quick shell command
server.tool(
  'shell_exec',
  'Execute a quick shell command (non-interactive)',
  {
    command: z.string().describe('Command to execute'),
    cwd: z.string().optional().describe('Working directory'),
  },
  async ({ command, cwd }) => {
    try {
      const result = execSync(command, {
        encoding: 'utf-8',
        cwd: cwd || process.env.HOME,
        timeout: 30000,
        maxBuffer: 5 * 1024 * 1024,
      });
      return {
        content: [{
          type: 'text',
          text: result || '(no output)',
        }],
      };
    } catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${e.message}\nStderr: ${e.stderr || 'none'}`,
        }],
        isError: true,
      };
    }
  }
);

// Tool: JSON operations
server.tool(
  'json_process',
  'Process JSON data with jq-like operations',
  {
    data: z.string().describe('JSON data to process'),
    operation: z.string().describe('Operation: keys, values, get.path, filter.expr'),
  },
  async ({ data, operation }) => {
    try {
      const json = JSON.parse(data);
      let result;
      
      switch (operation.split('.')[0]) {
        case 'keys':
          result = Object.keys(json);
          break;
        case 'values':
          result = Object.values(json);
          break;
        case 'get':
          const path = operation.split('.').slice(1);
          result = path.reduce((obj, key) => obj?.[key], json);
          break;
        default:
          result = json;
      }
      
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result, null, 2),
        }],
      };
    } catch (e) {
      return {
        content: [{
          type: 'text',
          text: `Error: ${e.message}`,
        }],
        isError: true,
      };
    }
  }
);

// Start server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
