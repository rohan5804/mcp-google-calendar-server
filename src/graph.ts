import { calendar } from './auth.js';
import { env } from './config/env.js';
import { v4 as uuidv4 } from 'uuid';

export interface CreateMeetingParams {
  subject: string;
  startDateTime: string;
  endDateTime: string;
  attendees: string[];
  timezone?: string;
}

export async function createGoogleCalendarEvent(params: CreateMeetingParams) {
  const event = {
    summary: params.subject,
    start: {
      dateTime: params.startDateTime,
      timeZone: params.timezone || env.DEFAULT_TIMEZONE,
    },
    end: {
      dateTime: params.endDateTime,
      timeZone: params.timezone || env.DEFAULT_TIMEZONE,
    },
    attendees: params.attendees.map(email => ({ email })),
    conferenceData: {
      createRequest: {
        requestId: uuidv4(),
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
  };

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
    });
    return response.data;
  } catch (error: any) {
    console.error('❌ Error creating Google Calendar event:', error.response?.data || error.message);
    throw new Error(`Failed to create event: ${error.message}`);
  }
}

export async function listUpcomingEvents() {
  try {
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: 'startTime',
    });
    return response.data.items || [];
  } catch (error: any) {
    console.error('❌ Error listing events:', error.response?.data || error.message);
    throw new Error('Failed to list events');
  }
}

export async function deleteEvent(eventId: string) {
  try {
    await calendar.events.delete({
      calendarId: 'primary',
      eventId: eventId,
    });
  } catch (error: any) {
    console.error('❌ Error deleting event:', error.response?.data || error.message);
    throw new Error('Failed to delete event');
  }
}
