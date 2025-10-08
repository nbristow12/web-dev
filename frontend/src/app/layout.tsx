import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "User Registration App",
  description: "A user registration application with PostgreSQL database",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
