"use client";
import Link from "next/link";
import React from "react";
import styles from "./LandingPage.module.scss";
import clsx from "clsx";
import { AuthStore } from "@/stores/AuthStore";
import Feed from "../Home/Feed";

type Props = {};
interface AuthButtonCompProp {
  text: string;
  variant: "primary" | "secondary";
}
const AuthButton: React.FC<AuthButtonCompProp> = ({ text, variant }) => {
  const btnVariants = {
    primary: styles.primary,
    secondary: styles.secondary,
  };
  return (
    <Link
      href="/login"
      className={clsx({
        [styles.btn]: true,
        [btnVariants[variant]]: true,
      })}
    >
      {text}
    </Link>
  );
};
export default function LandingPage({}: Props) {
  const isAuthenticad = AuthStore.currentUser;

  return isAuthenticad ? (
    <Feed />
  ) : (
    <main className={styles.container}>
      <h1 className={styles.heading}>
        Connect, Collaborate, and Elevate your coding journey
      </h1>
      <p className={styles.sub_heading}>
        With gather.dev, you bond and connect with developers, creatives to
        collaborate, and take your professional journey to new heights.
      </p>
      <div className={styles.btnWrapper}>
        <AuthButton text="Log In" variant="secondary" />
        <AuthButton text="Sign Up" variant="primary" />
      </div>
    </main>
  );
}
