"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/app/login.module.css";
import loginCheck from "./loginCheck";
import Link from "next/link";
import getCookieUserID from "../hooks/getCokkieData/getCookieUserID";

export default function Login() {
  const [loginID, setloginID] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [userID, setUserID] = useState(0);

  useEffect(() => {
    loggedInReplace();
  }, []);

  const loggedInReplace = () => {
    const user = getCookieUserID(setUserID);
    if (user !== "" || undefined) {
      return undefined;
    } else {
      window.location.replace("/");
    }
  };

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const loginUser = await loginCheck({ loginID, pw, setError });

    if (loginUser && loginUser.status === "ok") {
      document.cookie = `userName=${loginUser.userName}`;
      document.cookie = `userID=${loginUser.userID}`;

      event.preventDefault();
      window.location.replace("/");
    }
  };

  return (
    <>
      <main className={styles.main}>
        <label>
          ログインID
          <br />
          <input
            type="loginID"
            value={loginID}
            onChange={(e) => setloginID(e.target.value)}
          />
        </label>
        <label>
          パスワード
          <br />
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
          />
        </label>
        {error ? <div>ログインできませんでした</div> : <></>}
        <button onClick={handleLogin} className={styles.btn}>
          ログイン
        </button>

        <Link href={"/signUp"} className={styles.signupLink}>
          新規登録
        </Link>
      </main>
    </>
  );
}
