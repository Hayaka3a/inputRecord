"use client";
import { useState } from "react";
import styles from "@/styles/app/login.module.css";
import loginCheck from "./loginCheck";
import Link from "next/link";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const loginUser = await loginCheck({ email, pw, setError });

    if (loginUser && loginUser.status === "ok") {
      document.cookie = `userName=${loginUser.userName}`;
      document.cookie = `userID=${loginUser.id}`;
      event.preventDefault();
      router.push("/");
    }
  };

  return (
    <main>
      <Header />
      <div className={styles.main}>
        <label>
          メールアドレス
          <br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </div>
    </main>
  );
}
