#!/usr/bin/env node
/**
 * Database MCP Server for Nimmit
 * Provides PostgreSQL and SurrealDB access to OpenClaw
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';
import { Pool } from 'pg';
import { Surreal } from 'surrealdb.js';

// PostgreSQL connection
const pgPool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432'),
  database: process.env.PGDATABASE || 'nimmit',
  user: process.env.PGUSER || 'nimmit',
  password: process.env.PGPASSWORD || '',
});

// SurrealDB connection
const surreal = new Surreal();

async function initSurreal() {
  try {
    await surreal.connect(process.env.SURREAL_URL || 'http://localhost:8000/rpc');
    await surreal.signin({
      username: process.env.SURREAL_USER || 'root',
      password: process.env.SURREAL_PASS || 'root',
    });
    await surreal.use({ namespace: 'nimmit', database: 'brain' });
  } catch (e) {
    console.error('SurrealDB connection failed:', e.message);
  }
}

// Create MCP server
const server = new McpServer({
  name: 'nimmit-database',
  version: '1.0.0',
});

// Tool: Query PostgreSQL
server.tool(
  'pg_query',
  'Execute a SQL query on PostgreSQL database',
  {
    sql: z.string().describe('SQL query to execute'),
    params: z.array(z.any()).optional().describe('Query parameters'),
  },
  async ({ sql, params = [] }) => {
    try {
      const result = await pgPool.query(sql, params);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result.rows, null, 2),
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

// Tool: Query SurrealDB
server.tool(
  'surreal_query',
  'Execute a SurrealQL query',
  {
    sql: z.string().describe('SurrealQL query to execute'),
  },
  async ({ sql }) => {
    try {
      const result = await surreal.query(sql);
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

// Tool: List tables
server.tool(
  'pg_list_tables',
  'List all tables in PostgreSQL database',
  {},
  async () => {
    try {
      const result = await pgPool.query(`
        SELECT table_name 
        FROM information_schema.tables 
        WHERE table_schema = 'public'
        ORDER BY table_name
      `);
      return {
        content: [{
          type: 'text',
          text: JSON.stringify(result.rows, null, 2),
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

// Initialize and start
async function main() {
  await initSurreal();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch(console.error);
