"use client"

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { useMainContext } from "@/appContext";
import { AuthStore } from "@/stores/AuthStore";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";

type Props = {};

function Navbar({}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => {
    return pathname === href
      ? "text-white border-b-2 border-blue-500"
      : "text-gray-300";
  };

  const handleLogout = () => {
    AuthStore.logout();
    router.push("/login");
  };

  return (
    <header className="py-5 bg-gray-900 sticky top-0 z-50">
      <nav className="flex justify-between items-center max-w-screen-xl px-4 md:px-8 m-auto">
        <div className="text-white text-xl font-bold">
          <Link href={AuthStore.currentUser ? "/home" : "/"}>Codesphere</Link>
        </div>
        {AuthStore?.currentUser ? (
          <div className="flex items-center gap-5">
            {/* Global Search Input Field */}
            <input
              type="text"
              placeholder="Search..."
              className="bg-gray-800 text-white px-4 py-2 rounded-lg w-64 hidden md:block"
            />
            <ul className="flex items-center justify-center gap-5">
              {/* Profile Button or Avatar */}
              <li>
                <Link
                  className={`flex items-center hover:text-white ${isActive(
                    "/profile"
                  )}`}
                  href="/profile"
                >
                  <FaUser className="h-5 w-5 mr-1" />
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className={`flex items-center hover:text-white ${isActive(
                    "/login"
                  )}`}
                >
                  <FaSignOutAlt className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <ul className="flex items-center justify-center gap-5">
            <li>
              <Link
                href="/login"
                className={`hover:text-white ${isActive("/login")}`}
              >
                Login
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
        )}
      </nav>
    </header>
  );
}

export default observer(Navbar);
