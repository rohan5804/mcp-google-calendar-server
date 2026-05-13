#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ErrorCode, ListToolsRequestSchema, McpError, } from '@modelcontextprotocol/sdk/types.js';
import { createMeetingTool } from './tools/createMeeting.js';
import { listMeetingsTool } from './tools/listMeetings.js';
import { cancelMeetingTool } from './tools/cancelMeeting.js';
class TeamsCalendarServer {
    server;
    constructor() {
        this.server = new Server({
            name: 'mcp-teams-calendar',
            version: '1.0.0',
        }, {
            capabilities: {
                tools: {},
            },
        });
        this.setupToolHandlers();
        // Error handling
        this.server.onerror = (error) => console.error('[MCP Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }
    setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'create_meeting',
                    description: 'Schedule a new Microsoft Teams meeting',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            subject: { type: 'string', description: 'Subject/title of the meeting' },
                            time: { type: 'string', description: 'Date and time (e.g., "tomorrow at 5pm" or ISO string)' },
                            attendees: {
                                type: 'array',
                                items: { type: 'string' },
                                description: 'List of email addresses'
                            },
                            durationMinutes: { type: 'number', description: 'Duration in minutes (default: 30)' }
                        },
                        required: ['subject', 'time', 'attendees'],
                    },
                },
                {
                    name: 'list_meetings',
                    description: 'List upcoming calendar events',
                    inputSchema: {
                        type: 'object',
                        properties: {},
                    },
                },
                {
                    name: 'cancel_meeting',
                    description: 'Cancel an existing calendar event',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            eventId: { type: 'string', description: 'The unique ID of the event to cancel' },
                        },
                        required: ['eventId'],
                    },
                },
            ],
        }));
        this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
            try {
                switch (request.params.name) {
                    case 'create_meeting':
                        return await createMeetingTool(request.params.arguments);
                    case 'list_meetings':
                        return await listMeetingsTool();
                    case 'cancel_meeting':
                        return await cancelMeetingTool(request.params.arguments);
                    default:
                        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${request.params.name}`);
                }
            }
            catch (error) {
                return {
                    content: [
                        {
                            type: 'text',
                            text: `Error: ${error.message}`,
                        },
                    ],
                    isError: true,
                };
            }
        });
    }
    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('MCP Teams Calendar Server running on stdio');
    }
}
const server = new TeamsCalendarServer();
server.run().catch(console.error);
//# sourceMappingURL=index.js.map