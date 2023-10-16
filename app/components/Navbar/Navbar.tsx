"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { observer } from "mobx-react";
import { useRouter } from "next/navigation";
import { AuthStore } from "../../stores/AuthStore";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { LuSearch } from "react-icons/lu";
import Image from "next/image";
import { HiMenuAlt3, HiSearch } from "react-icons/hi";
import styles from "./Navbar.module.scss";
import clsx from "clsx";
import { PostStore } from "@/stores/postStore";

type AuthenticatedNavProps = {
  handleLogout: () => void;
  isActive: (href: string) => string;
};

const AuthenticatedNav: React.FC<AuthenticatedNavProps> = ({
  handleLogout,
  isActive,
}) => (
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
      <div className={styles.navbar__items}>
        <button className={styles.searchIcon}>
          <LuSearch />
        </button>
        <input
          type="text"
          placeholder="Search..."
          className={styles.navbar__search}
        />

        <Link
          className={clsx(styles.profileBtn, {
            [isActive("/profile")]: true,
          })}
          href="/profile"
        >
          <FaUser />
          <span className={styles.navbar__text}>Profile</span>
        </Link>
        <button type="button" onClick={handleLogout} className={styles.logout}>
          <FaSignOutAlt />
          <span className={styles.navbar__text}>Logout</span>
        </button>
      </div>
    </nav>
  </header>
);

const PublicNav = () => (
  <nav className={styles.publicNav}>
    <Link className={styles.logo} href={AuthStore.currentUser ? "/home" : "/"}>
      <Image
        src="/gather-logo.png"
        className={styles.logoImage}
        alt="Logo"
        width={30}
        height={30}
      />
      gather.dev
    </Link>
    <button className={styles.menuButton}>
      <HiMenuAlt3 />
    </button>
  </nav>
);

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) => (pathname === href ? styles.active : "");

  const handleLogout = () => {
    router.push("/login");
    AuthStore.logout();
  };

  if (PostStore.loading && !AuthStore.currentUser) return null;

  return AuthStore.currentUser ? (
    <AuthenticatedNav handleLogout={handleLogout} isActive={isActive} />
  ) : (
    <PublicNav />
  );
};

export default observer(Navbar);
