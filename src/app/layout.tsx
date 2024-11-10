import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Link from "next/link";

import UserButton from "./components/user-button";
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, auth } from "@/auth";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (session?.user) {
    // TODO: Redirect to the chat page
    // filter sensitive data before rendering
    session.user = {
      name: session.user.name,
      image: session.user.image,
      email: session.user.email,
    };
  }
  return (
    <SessionProvider basePath="/api/auth" session={session}>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased px-2 md:px-5`}
        >
          <header className="text-white font-bold bg-green-900 text-2xl p-4">
            <div className="container flex flex-grow justify-between items-center">
              <Link href="/">GPT Chat</Link>
              <nav className="flex space-x-4">
                <Link href="/about" className="mt-0 font-light text-white">
                  About
                </Link>
                <div>
                  <UserButton 
                  onSignIn={async () => {
                    "use server";
                    await signIn();
                  }}
                  onSignOut={async () => {
                    "use server";
                    await signOut();
                  }}
                  />
                </div>
              </nav>
            </div>
            <div></div>
          </header>
          <div className="flex flex-col md:flex-row">
            <div className="flex flex-grow">{children}</div>
          </div>
        </body>
      </html>
    </SessionProvider>
  );
}
