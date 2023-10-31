import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import AuthProvider from "./AuthProvider";

const inter = Sora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogger",
  description: "A blog website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </AuthProvider>
  );
}
