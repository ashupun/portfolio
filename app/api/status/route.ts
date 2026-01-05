import { NextResponse } from 'next/server';

const DISCORD_USER_ID = '1387327840676216875';

export async function GET() {
  try {
    const response = await fetch(
      `https://api.lanyard.rest/v1/users/${DISCORD_USER_ID}`
    );

    if (!response.ok) {
      return NextResponse.json({
        status: 'Offline',
        activity: null,
      });
    }

    const data = await response.json();

    const statusMap: Record<string, string> = {
      online: 'Online',
      idle: 'Away',
      dnd: 'Do Not Disturb',
      offline: 'Offline',
    };

    return NextResponse.json({
      status: statusMap[data.data.discord_status] || 'Offline',
      activity: null,
    });
  } catch {
    return NextResponse.json({
      status: 'Offline',
      activity: null,
    });
  }
}
