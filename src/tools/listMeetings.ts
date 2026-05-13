import { listUpcomingEvents } from '../graph.js';

export async function listMeetingsTool() {
  const events = await listUpcomingEvents();

  if (events.length === 0) {
    return {
      content: [
        {
          type: 'text',
          text: 'No upcoming events found.',
        },
      ],
    };
  }

  const text = events
    .map(
      (event: any) =>
        `- ${event.summary} (${event.start?.dateTime || event.start?.date})\n  ID: ${event.id}${event.hangoutLink ? `\n  Meet: ${event.hangoutLink}` : ''}`
    )
    .join('\n\n');

  return {
    content: [
      {
        type: 'text',
        text: `Upcoming Events:\n\n${text}`,
      },
    ],
  };
}
