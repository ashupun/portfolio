export const blogs = [
  {
    id: "05012026",
    title: "New Website Launch",
    content: `After weeks of late nights and countless iterations, my new portfolio is finally live! I wanted something that felt like me - clean, cozy, and a little playful.

## Why I Built This

My old portfolio was getting stale. I wanted a space that actually represents who I am now - someone who loves design, code, and way too much pink.

## The Stack

- **Next.js 14** - Fast, flexible, and fun to work with
- **Tailwind CSS v4** - CSS variables make theming a breeze
- **TypeScript** - Catching bugs before they catch me
- **Vercel** - Deploy in seconds, sleep peacefully

## The Aesthetic

Bento grid layout because I love how each widget tells its own story. Warm amber tones for dark mode (cozy coffee shop energy), soft pinks for light mode (because pink is always a good idea). Every detail was intentional - from the typing animation to the hover states.

Hope you like it as much as I enjoyed making it!`,
    image: "/05012026.png",
    date: "2026-01-05",
  },
  {
    id: "06012026",
    title: "My Setup Tour 2026",
    content: `Finally documenting the space where I work, learn, and unwind. It's a balance of practical tools, a powerful setup, and a lot of pink that make it super cute.

## Specs

- **Laptop**: MacBook Pro M4, 32GB RAM, 1TB SSD
- **Gaming PC**: Ryzen 7 9800XD, 64GB RAM, RX 90700 XT + Pink Hyte Y70 Case
- **Keyboard**: 65% YUNZII Mechanical Keyboard with custom keycaps
- **Mouse**: Logitech X Superlight 2c
- **Monitor**: 240Hz 24" + 2 other monitors for multitasking
- **Headphones**: Apple AirPods Max
- **Microphone**: Shure MV7+

## The Vibe

Lots of pink accents - LED strips, desk mat, accessories. My cat often joins me, making it a cozy and lively workspace.`,
    image: "/06012026.jpg",
    date: "2026-01-06",
  },
];

export function getExcerpt(content: string): string {
  const firstParagraph = content.split("\n\n")[0];
  const firstSentence = firstParagraph.split(/[.!?]/)[0];
  return firstSentence + (firstParagraph.includes(".") ? "." : "!");
}
