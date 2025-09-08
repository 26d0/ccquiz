import type { Metadata } from "next";
import { Noto_Sans, Geist_Mono, M_PLUS_Rounded_1c, Roboto_Mono } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const mplusRounded = M_PLUS_Rounded_1c({
  variable: "--font-mplus-rounded",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "ccQuiz",
  description: "Country code quiz game",
  openGraph: {
    title: "ccQuiz",
    description: "Country code quiz game",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ccQuiz",
    description: "Country code quiz game",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${geistMono.variable} ${robotoMono.variable} ${mplusRounded.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
