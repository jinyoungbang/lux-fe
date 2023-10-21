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
          <header className="h-14 z-20 relative bg-white mx-auto ">
            <Navigation />
          </header>
          <div className="flex flex-col px-5 py-2.5">
              {children}
          </div>
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
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2023{" "}
            <Link href="/" className="hover:underline">
              Lux
            </Link>
            . All Rights Reserved.
          </span>
        </li>
        <div className="flex flex-row">
          <li className="ml-2">
            <Link href="/about">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                About
              </span>
            </Link>
          </li>
          <li className="ml-2">
            <Link href="/contact">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                Get Started
              </span>
            </Link>
          </li>
        </div>
      </ul>
    </footer>
  );
};