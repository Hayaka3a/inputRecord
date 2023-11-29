"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import addUser from "./addUser";
import loginIDCheck from "./loginIDCheck";
import pwCheck from "./pwCheck";
import Header from "@/components/header";
import styles from "@/styles/app/signUp.module.scss";
import getUserData from "../hooks/fetchDB/getUserData";

export default function signUp() {
  const [loginID, setloginID] = useState("");
  const [pw, setPw] = useState("");
  const [conPw, setConPw] = useState("");
  const [name, setName] = useState("");
  const [loginIDError, setloginIDError] = useState("");
  const [passError, setPassError] = useState("");

  const sendData = { loginID: loginID, pw: pw, userName: name, status: false };

  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const res = await addUser(sendData);
      if (res?.status === "ok") {
        console.log("ok!");

        const cookieSetUser = await getUserData(loginID);
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
          ログインID
          <br />
          <input
            type="loginID"
            value={loginID}
            onChange={(e) => setloginID(e.target.value)}
            onBlur={() => {
              loginIDCheck(loginID, setloginIDError);
            }}
          />
          <br />
        </label>
        {loginIDError ? <p className={styles.error}>{loginIDError}</p> : <></>}
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
          !name || !loginID || !pw || !conPw || !!loginIDError || !!passError
        }
      >
        登録
      </button>
    </main>
  );
}
