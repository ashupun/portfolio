import { NextResponse } from 'next/server';

const LONDON_LAT = 51.5074;
const LONDON_LON = -0.1278;

export async function GET() {
  try {
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${LONDON_LAT}&longitude=${LONDON_LON}&current=temperature_2m,weather_code`
    );

    if (!response.ok) {
      return NextResponse.json({
        temp: 8,
        condition: 'Cloudy',
      });
    }

    const data = await response.json();
    const weatherCode = data.current.weather_code;

    const condition = getConditionFromCode(weatherCode);

    return NextResponse.json({
      temp: Math.round(data.current.temperature_2m),
      condition,
    });
  } catch {
    return NextResponse.json({
      temp: 8,
      condition: 'Cloudy',
    });
  }
}

function getConditionFromCode(code: number): string {
  if (code === 0) return 'Clear';
  if (code <= 3) return 'Cloudy';
  if (code <= 49) return 'Foggy';
  if (code <= 59) return 'Drizzle';
  if (code <= 69) return 'Rain';
  if (code <= 79) return 'Snow';
  if (code <= 82) return 'Showers';
  if (code <= 86) return 'Snow';
  if (code >= 95) return 'Thunderstorm';
  return 'Cloudy';
}
