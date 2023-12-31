"use client"

import "./globals.css";
import Navigation from "@/components/Navigation";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col max-w-md min-h-screen mx-auto">
        <div>
          {children}
        </div>
        <div className="flex-end">
          <Footer />
        </div>
      </body>
    </html>
  );
}

const Footer = () => {
  return (
    <footer className="h-10 z-20 min-w-[320px] relative bg-white max-w-screen-lg mx-auto px-5">
      <ul className="flex flex-row justify-between">
        <li>
          {/* <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Lux
            </Link>
            . All Rights Reserved.
          </span> */}
        </li>
      </ul>
    </footer>
  );
};