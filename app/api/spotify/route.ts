import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const PLAYLIST_ID = '0dMa0TUReBfJni3qnEyx4b';

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

async function getAccessToken() {
  const response = await fetch(TOKEN_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
    }),
  });

  return response.json();
}

export async function GET() {
  try {
    const { access_token } = await getAccessToken();

    const playlistResponse = await fetch(
      `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}/tracks?limit=50`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    if (playlistResponse.status !== 200) {
      return NextResponse.json({ isPlaying: false });
    }

    const data = await playlistResponse.json();
    const tracks = data.items;

    if (!tracks || tracks.length === 0) {
      return NextResponse.json({ isPlaying: false });
    }

    const randomTrack = tracks[Math.floor(Math.random() * tracks.length)].track;

    return NextResponse.json({
      isPlaying: false,
      title: randomTrack.name,
      artist: randomTrack.artists.map((a: { name: string }) => a.name).join(', '),
      albumImageUrl: randomTrack.album.images[0]?.url,
      songUrl: randomTrack.external_urls.spotify,
      previewUrl: randomTrack.preview_url,
    });
  } catch {
    return NextResponse.json({ isPlaying: false });
  }
}
