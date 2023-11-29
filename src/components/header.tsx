"use client";
import Link from "next/link";
import styles from "@/styles/components/header.module.css";
import { useEffect, useState } from "react";
import getCookieUserName from "@/app/hooks/getCokkieData/getCookieUserName";
import logout from "@/app/hooks/logout";

export default function Header() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    getCookieUserName(setUserName);
  }, []);

  return (
    <>
      <div className={styles.main}>
        <div className={styles.upperSide}>
          <h1>
            <Link href={"/"}>インプットきろく</Link>
          </h1>
          {userName ? (
            <div className={styles.user}>
              <Link href={"/"}>
                <p>{userName}さん </p>
              </Link>
              <button onClick={logout}>ログアウト</button>
            </div>
          ) : (
            <button className={styles.loginBtn}>
              <Link href={"/login"}>ログイン</Link>
            </button>
          )}
        </div>

        <nav className={styles.link}>
          <li>
            <Link href={"/"}>入力</Link>
          </li>
          <li>
            <Link href={"/myrecord"}>自分の記録</Link>
          </li>
          <li>
            <Link href={"/newrecord"}>みんなの記録</Link>
          </li>
        </nav>
      </div>
    </>
  );
}
