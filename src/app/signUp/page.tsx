"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import addUser from "./addUser";
import emailCheck from "./emailCheck";
import pwCheck from "./pwCheck";
import Header from "@/components/header";
import styles from "@/styles/app/signUp.module.scss";
import getUserData from "../hooks/fetchDB/getUserData";

export default function signUp() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [conPw, setConPw] = useState("");
  const [name, setName] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passError, setPassError] = useState("");

  const sendData = { email: email, pw: pw, userName: name, status: false };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await addUser(sendData);
      if (res?.status === "ok") {
        console.log("ok!");

        const cookieSetUser = await getUserData(email);
        if (cookieSetUser) {
          document.cookie = `userName=${cookieSetUser.userName}`;
          document.cookie = `userID=${cookieSetUser.id}`;
          router.push("/");
        }
      } else if (res?.status === "error") {
        console.log("addUser error!");
      }
    } catch {
      console.log("handleSubmit error...");
    }
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        <h1>新規登録</h1>
        <form>
          <label>
            ニックネーム
            <br />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
          </label>
          <label>
            メールアドレス
            <br />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => {
                emailCheck(email, setEmailError);
              }}
            />
            <br />
          </label>
          {emailError ? <p className={styles.error}>{emailError}</p> : <></>}
          <label>
            パスワード
            <br />
            <input
              type="password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
            />
            <br />
          </label>
          <label>
            確認用パスワード
            <br />
            <input
              type="password"
              value={conPw}
              onChange={(e) => setConPw(e.target.value)}
              onBlur={() => pwCheck(pw, conPw, setPassError)}
            />
            <br />
          </label>
          {passError ? <p className={styles.error}>{passError}</p> : <></>}
        </form>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={
            !name || !email || !pw || !conPw || !!emailError || !!passError
          }
        >
          登録
        </button>
      </main>
    </>
  );
}
