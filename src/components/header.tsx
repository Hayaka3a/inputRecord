"use client";
import Link from "next/link";
import DefaultButton from "./defaultButton";
import styles from "@/styles/components/header.module.css";

export default function Header() {
  const userName = "";

  return (
    <>
      <div className={styles.main}>
        <div className={styles.upperSide}>
          <h1>なんでもきろく</h1>
        </div>
        <div className={styles.lowerSide}>
          {userName && (
            <Link href={"/"} className={styles.link}>
              <p>{userName}さん </p>
              <img src="/human.png" alt="user" />
            </Link>
          )}
        </div>
        <nav className={styles.link}>
          <li>
            <Link href={"/"}>入力</Link>
          </li>
          <li>
            <Link href={"/history"}>自分の記録</Link>
          </li>
          <li>
            <Link href={"/history"}>みんなの記録</Link>
          </li>
        </nav>
      </div>
    </>
  );
}
