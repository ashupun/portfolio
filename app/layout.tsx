import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = "https://ashupun.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ashu Pun | Designer & Engineer",
    template: "%s | Ashu Pun",
  },
  description: "Designer and engineer based in London. Creating beautiful, functional digital experiences with a passion for clean design and modern web technologies.",
  keywords: ["Ashu Pun", "designer", "engineer", "web developer", "London", "portfolio", "UI/UX", "Next.js", "React"],
  authors: [{ name: "Ashu Pun", url: baseUrl }],
  creator: "Ashu Pun",
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: baseUrl,
    siteName: "Ashu Pun",
    title: "Ashu Pun | Designer & Engineer",
    description: "Designer and engineer based in London. Creating beautiful, functional digital experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ashu Pun - Designer & Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashu Pun | Designer & Engineer",
    description: "Designer and engineer based in London. Creating beautiful, functional digital experiences.",
    creator: "@ashubun",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: baseUrl,
  },
};

const themeScript = `
  (function() {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (saved === 'dark' || (!saved && prefersDark)) {
      document.documentElement.classList.add('dark');
    }
  })();
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Ashu Pun",
  url: baseUrl,
  image: `${baseUrl}/profilepicture.jpg`,
  jobTitle: "Designer & Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "London",
    addressCountry: "UK",
  },
  sameAs: [
    "https://x.com/ashubun",
    "https://github.com/ashupun",
    "https://www.linkedin.com/in/ashubun/",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <meta name="view-transition" content="same-origin" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} antialiased`}
      >
        <div className="page-transition">
          {children}
        </div>
      </body>
    </html>
  );
}
