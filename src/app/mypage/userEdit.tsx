"use client";
import styles from "@/styles/app/mypage.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import pwCheck from "../signUp/pwCheck";
import getUserData from "../hooks/fetchDB/getUserData";
import getCookieUserID from "../hooks/getCokkieData/getCookieUserID";
import updateUser from "../hooks/fetchDB/updateUser";

export default function UserEdit() {
  const [editModal, setEditModal] = useState(false);
  const [userID, setUserID] = useState(0);
  const [pw, setPw] = useState("");
  const [conPw, setConPw] = useState("");
  const [passError, setPassError] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    getCookieUserID(setUserID);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let user = await getUserData(userID);
      if (user) {
        setUserName(user.userName);
      }
    };
    fetchData();
  }, [userID]);

  const handleSubmit = () => {
    updateUser({ userID, userName, pw });
  };

  return (
    <>
      <Link href={""} onClick={() => setEditModal(!editModal)}>
        ユーザー情報変更
      </Link>
      {editModal && (
        <div className={styles.overlay}>
          <div className={styles.upper}>
            <button
              onClick={() => setEditModal(!editModal)}
              className={styles.returnBtn}
            >
              ←戻る
            </button>
            <p>ユーザー情報変更</p>
          </div>
          <form onSubmit={handleSubmit}>
            <label>
              新しいユーザー名
              <br />
              <input
                type="text"
                value={userName}
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </label>
            <label>
              新しいパスワード(必須)
              <br />
              <input
                type="password"
                value={pw}
                onChange={(e) => setPw(e.target.value)}
              />
              <br />
            </label>
            <label>
              確認用パスワード(必須)
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
            disabled={!pw || !conPw}
            className={styles.submitBtn}
          >
            変更
          </button>
        </div>
      )}
    </>
  );
}
