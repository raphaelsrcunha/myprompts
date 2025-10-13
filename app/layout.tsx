import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "myPrompts",
  description: "Organize and manage your favorite AI prompts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 dark:bg-black">
        <div className="flex">
          <Sidebar />
          <Header />
          <main className="flex-1 ml-64 mt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
