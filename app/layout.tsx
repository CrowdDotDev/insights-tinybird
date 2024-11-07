import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  title: "Tinybird Insights PoC",
  description: "Tinybird Insights PoC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="max-w-5xl mx-auto">
          <div className="w-full py-8 rounded-lg border-green-600 bg-green-100 border text-center my-10 mx-auto max-w-4xl">
            <h1 className="font-bold">Disclaimer:</h1>
            <p>
              This is a proof of concept to explore and demonstrate a new
              architecture for Insights. The data is most likely not accurate.
            </p>
            <p>
              The app will go down for the day if we reach more than 1,000
              requests per day because we are in the Tinybird free trial.
            </p>
          </div>
          {children}
        </main>
      </body>
    </html>
  );
}
