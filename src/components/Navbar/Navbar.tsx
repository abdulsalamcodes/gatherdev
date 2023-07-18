"use client";

import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";

type Props = {};

export default function Navbar({}: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href ? "text-white border-b-2 border-blue-500" : "text-gray-300";
  };

  return (
    <header className="mb-10 py-5 bg-gray-900 sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-screen-xl m-auto">
        <div className="text-white text-xl font-bold">
          <Link href={"/"}>Codesphere</Link>
        </div>
        <ul className="flex items-center justify-center gap-5">
          <li>
            <Link
              href="/login"
              className={`hover:text-white ${isActive("/login")}`}
            >
              Login{" "}
            </Link>
          </li>
          <li>
            <Link
              href="/signup"
              className={`hover:text-white ${isActive("/signup")}`}
            >
              Sign Up
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
