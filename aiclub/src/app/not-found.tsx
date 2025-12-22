"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground px-6 text-center">
      <h1 className="text-[80px] font-extrabold text-primary1 leading-none">
        404
      </h1>
      <h2 className="text-2xl font-semibold mt-2">Page Not Found</h2>
      <p className="mt-3 text-secondary1 max-w-md">
        Oops! The page you’re looking for doesn’t exist or has been moved.  
        Try returning to the homepage or exploring another section.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary1 text-background rounded-md font-medium hover:bg-primary2 transition-colors"
        >
          Go Home
        </Link>

        <Link
          href="/#contact"
          className="px-6 py-3 border-2 border-primary1 text-primary1 rounded-md font-medium hover:bg-primary1 hover:text-background transition-colors"
        >
          Contact Us
        </Link>
      </div>
    </main>
  );
}
