# MCP Google Calendar Server

An MCP server that enables Claude Desktop to manage your Google Calendar using the Google Calendar API.

## Features

- **Create Google Calendar Events**: Schedule events using natural language.
- **List Events**: View upcoming calendar events.
- **Delete Events**: Remove events from your calendar by ID.
- **Google Meet Integration**: Automatically generates Google Meet links for events.

## Prerequisites

- Node.js (v18 or higher)
- A Google Cloud Project with Google Calendar API enabled.
- OAuth 2.0 Credentials (Client ID and Client Secret).
- A Refresh Token for the account [rohankeskar10@gmail.com](mailto:rohankeskar10@gmail.com).

## 1. Google Cloud Setup

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/).
2.  Create a new project named `MCP-Google-Calendar`.
3.  Go to **APIs & Services** -> **Library** and enable **Google Calendar API**.
4.  Go to **OAuth consent screen**:
    - Select **External**.
    - Fill in app name, user support email, and developer contact info.
    - Add scopes: `https://www.googleapis.com/auth/calendar.events`.
5.  Go to **Credentials** -> **Create Credentials** -> **OAuth client ID**.
    - Application type: **Web application**.
    - Add Authorized redirect URIs: `http://localhost:3000/oauth2callback`.
    - Copy your **Client ID** and **Client Secret**.

## 2. Obtaining a Refresh Token

Since this is a CLI-based server, you need a refresh token to authenticate without manual browser interaction every time. You can use tools like the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground/) or a simple script to get one using your Client ID and Secret.

## 3. Server Installation

1.  Clone this repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Create a `.env` file from the template:
    ```bash
    cp .env.example .env
    ```
4.  Fill in your credentials in `.env`:
    - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID.
    - `GOOGLE_CLIENT_SECRET`: Your Google OAuth Client Secret.
    - `GOOGLE_REFRESH_TOKEN`: Your OAuth Refresh Token.
    - `USER_EMAIL`: `rohankeskar10@gmail.com`

5.  Build the project:
    ```bash
    npm run build
    ```

## 4. Claude Desktop Configuration

Add the server to your Claude Desktop configuration:

- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "google-calendar": {
      "command": "node",
      "args": [
        "C:/mcpserver/build/index.js"
      ],
      "env": {
        "GOOGLE_CLIENT_ID": "...",
        "GOOGLE_CLIENT_SECRET": "...",
        "GOOGLE_REFRESH_TOKEN": "...",
        "USER_EMAIL": "rohankeskar10@gmail.com"
      }
    }
  }
}
```

## Tools

- `create_meeting`: Schedule a new Google Calendar event with a Meet link.
- `list_meetings`: List upcoming events from your primary calendar.
- `cancel_meeting`: Delete a calendar event by ID.
