import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const rajdhani = Rajdhani({ subsets: ["latin"], weight: ["400", "500", "600", "700"] });

export const metadata: Metadata = {
  title: "Helldivers 2 Companion",
  description: "Stay battle-ready with the Helldivers 2 companion experience. Track the galactic war, plan ops, and sync with your squad in real-time.",
  openGraph: {
    title: "Helldivers 2 Companion App",
    description: "Command Center for Super Earth's finest. War intel, squad coordination, and stratagem mastery in one place.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Helldivers 2 Companion App",
    description: "Command Center for Super Earth's finest. War intel, squad coordination, and stratagem mastery in one place."
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={rajdhani.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
