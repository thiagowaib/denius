import { Metadata } from "next/types";
import { Analytics } from "@vercel/analytics/react"
import "./globals.css";


export const metadata: Metadata = {
  title: "Denius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col items-center justify-center h-screen bg-gray-950 text-slate-50 w-screen overflow-hidden">
        {children}
        <Analytics/>
      </body>
    </html>
  );
}
