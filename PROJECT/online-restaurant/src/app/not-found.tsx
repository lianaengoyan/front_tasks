"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-6 text-center relative overflow-hidden">
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0c0c0c] to-[#1a0000] -z-10" />

      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-red-900/30 to-transparent -z-10" />

      <h1 className="text-8xl md:text-[10rem] font-serif font-bold text-white-500 mb-6">
        404
      </h1>

      <h2 className="text-3xl md:text-5xl font-light mb-4 text-gray-100">
        Page Not Found
      </h2>

      <p className="text-gray-400 mb-8 max-w-xl">
        The page you are looking for doesn’t exist or has been moved.
        Return to the homepage to continue your luxury experience.
      </p>

      <Link
        href="/"
        className="inline-block px-10 py-4 border rounded hover:bg-red-700 text-white uppercase tracking-widest text-lg transition-all duration-500"
      >
        Login Page
      </Link>
    </div>
  );
}