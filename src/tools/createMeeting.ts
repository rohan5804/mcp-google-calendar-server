import { createGoogleCalendarEvent } from '../graph.js';
import { parseDateTime } from '../utils/dateParser.js';

export async function createMeetingTool(args: any) {
  const { subject, time, attendees, durationMinutes = 30 } = args;

  if (!subject || !time || !attendees) {
    throw new Error('Subject, time, and attendees are required');
  }

  const startDate = parseDateTime(time);
  if (!startDate) {
    throw new Error(`Could not parse time: "${time}"`);
  }

  const endDate = new Date(startDate.getTime() + durationMinutes * 60000);

  const event = await createGoogleCalendarEvent({
    subject,
    startDateTime: startDate.toISOString(),
    endDateTime: endDate.toISOString(),
    attendees: Array.isArray(attendees) ? attendees : [attendees],
  });

  return {
    content: [
      {
        type: 'text',
        text: `✅ Google Calendar event created successfully!
Subject: ${event.summary}
Start: ${event.start?.dateTime}
End: ${event.end?.dateTime}
Google Meet Link: ${event.hangoutLink || 'N/A'}`,
      },
    ],
  };
}
