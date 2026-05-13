import { google } from 'googleapis';
import { env } from './config/env.js';
const oauth2Client = new google.auth.OAuth2(env.GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_SECRET, env.GOOGLE_REDIRECT_URI);
oauth2Client.setCredentials({
    refresh_token: env.GOOGLE_REFRESH_TOKEN,
});
export async function getGoogleAuth() {
    return oauth2Client;
}
export const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
//# sourceMappingURL=auth.js.map