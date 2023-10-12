"use client";

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { AuthStore } from "@/stores/AuthStore";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import styles from "./Navbar.module.scss";
import clsx from "clsx";
import Image from "next/image";

type Props = {};
interface AuthenticatedNavProp {
  handleLogout: () => void;
  isActive: (href: string) => string;
}
const AuthenticatedNav: React.FC<AuthenticatedNavProp> = ({
  handleLogout,
  isActive,
}) => {
  return (
    <div className={styles.authenticatedNav}>
      {/* Global Search Input Field */}
      <input
        type="text"
        placeholder="Search..."
        className={styles.globarSearch}
      />
      <ul className="flex items-center justify-center gap-5">
        {/* Profile Button or Avatar */}
        <li>
          <Link
            className={clsx({
              [styles.profileBtn]: true,
              [isActive("/profile")]: true,
            })}
            href="/profile"
          >
            <FaUser className="h-5 w-5 mr-1" />
            Profile
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className={clsx({
              [styles.link]: true,
            })}
          >
            <FaSignOutAlt className="h-5 w-5 mr-1" />
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

const PublicNav = ({ isActive }: { isActive: (href: string) => string }) => {
  return (
    <ul className={styles.publicNav}>
      <li className={styles.navItem}>
        <Link
          href="/login"
          className={clsx({
            [styles.link]: true,
            [isActive("/login")]: true,
          })}
        >
          Login
        </Link>
      </li>
      <li>
        <Link
          href="/signup"
          className={clsx({
            [styles.link]: true,
            [isActive("/signup")]: true,
          })}
        >
          Sign Up
        </Link>
      </li>
    </ul>
  );
};
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
    <header className={styles.container}>
      <nav className={styles.navbar}>
        <Link
          className={styles.logo}
          href={AuthStore.currentUser ? "/home" : "/"}
        >
          <Image
            src="/gather-logo.png"
            className={styles.logoImage}
            alt="Logo"
            width={30}
            height={30}
          />
          gather.dev
        </Link>
        {AuthStore?.currentUser ? (
          <AuthenticatedNav handleLogout={handleLogout} isActive={isActive} />
        ) : (
          <PublicNav isActive={isActive} />
        )}
      </nav>
    </header>
  );
}

export default observer(Navbar);
