import { deleteEvent } from '../graph.js';

export async function cancelMeetingTool(args: any) {
  const { eventId } = args;

  if (!eventId) {
    throw new Error('Event ID is required');
  }

  await deleteEvent(eventId);

  return {
    content: [
      {
        type: 'text',
        text: `✅ Event ${eventId} deleted successfully.`,
      },
    ],
  };
}

