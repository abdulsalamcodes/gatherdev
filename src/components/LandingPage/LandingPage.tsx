import Link from 'next/link';
import React from 'react';

type Props = {};

export default function LandingPage({}: Props) {
  return (
    <main className="text-white max-w-7xl mx-auto px-6">
      <section className="flex flex-col items-center justify-center h-screen">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8 md:text-6xl md:mb-12 lg:text-7xl">
            Connect, Collaborate, and Elevate your coding journey
          </h1>
          <p className="text-lg mb-12 md:text-xl">
            Join CodeSphere – the ultimate social network for developers – and unlock new possibilities in your coding adventure.
          </p>
          <div className="flex space-x-4 items-center justify-center">
            <Link href="/signup" className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 ease-in-out">
              Sign Up
            </Link>
            <Link href="/login" className="border border-white hover:bg-white hover:text-blue-500 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-300 ease-in-out">
              Login
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
