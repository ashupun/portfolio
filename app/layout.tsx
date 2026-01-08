import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { DockProvider } from "./components/provider";
import { Dock } from "./components/dock";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const baseUrl = "https://ashupun.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Ashu Pun",
    template: "%s | Ashu Pun",
  },
  description: "Ashu Pun - Designer and engineer based in London. Creating beautiful, functional digital experiences with a passion for clean design and modern web technologies.",
  keywords: ["Ashu", "Ashu Pun", "ashupun", "Ashu developer", "Ashu designer", "Ashu London", "Ashu portfolio", "Ashu Pun portfolio", "designer", "engineer", "web developer", "frontend developer", "London", "portfolio", "UI/UX", "Next.js", "React"],
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
  alternateName: ["Ashu", "ashupun", "Ashubun"],
  url: baseUrl,
  image: `${baseUrl}/profilepicture.jpg`,
  jobTitle: "Designer & Engineer",
  description: "Ashu Pun is a designer and engineer based in London, creating beautiful digital experiences.",
  knowsAbout: ["Web Development", "UI/UX Design", "React", "Next.js", "TypeScript"],
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

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Ashu Pun",
  alternateName: ["Ashu", "Ashu Pun Portfolio"],
  url: baseUrl,
  description: "Portfolio of Ashu Pun - Designer and Engineer based in London",
  author: {
    "@type": "Person",
    name: "Ashu Pun",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} antialiased overflow-x-hidden`}
      >
        <div className="floating-blob blob-1" aria-hidden="true" />
        <div className="floating-blob blob-2" aria-hidden="true" />
        <div className="floating-blob blob-3" aria-hidden="true" />
        <DockProvider>
          <div className="page-transition relative z-10">
            {children}
          </div>
          <Dock />
        </DockProvider>
      </body>
    </html>
  );
}
