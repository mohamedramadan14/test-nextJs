import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextJs Chat GPT",
  description: "Your friendly smart assistant for all your chat needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
      >
        <header className="text-white font-bold bg-green-900 text-2xl">
          <div className="flex flex-grow">
            <Link href="/">GPT Chat</Link>
            <Link href="/about" className="mt-5 font-light">
              About
            </Link>
          </div>
          <div></div>
        </header>
        <div className="flex flex-col md:flex-row">
          <div className="flex flex-grow">{children}</div>
        </div>
      </body>
    </html>
  );
}
