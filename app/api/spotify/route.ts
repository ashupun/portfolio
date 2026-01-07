import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const RECENTLY_PLAYED_ENDPOINT = 'https://api.spotify.com/v1/me/player/recently-played?limit=1';

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token || '',
    }),
    cache: 'no-store',
  });

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const nowPlayingResponse = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    if (nowPlayingResponse.status === 200) {
      const data = await nowPlayingResponse.json();

      if (data.item) {
        return NextResponse.json({
          isPlaying: data.is_playing,
          title: data.item.name,
          artist: data.item.artists.map((a: { name: string }) => a.name).join(', '),
          albumImageUrl: data.item.album.images[0]?.url,
          songUrl: data.item.external_urls.spotify,
          progress: data.progress_ms,
          duration: data.item.duration_ms,
        });
      }
    }

    const recentResponse = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    if (recentResponse.status === 200) {
      const data = await recentResponse.json();
      const track = data.items?.[0]?.track;

      if (track) {
        return NextResponse.json({
          isPlaying: false,
          title: track.name,
          artist: track.artists.map((a: { name: string }) => a.name).join(', '),
          albumImageUrl: track.album.images[0]?.url,
          songUrl: track.external_urls.spotify,
        });
      }
    }

    return NextResponse.json({ isPlaying: false });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
