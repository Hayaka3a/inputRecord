"use client";
import styles from "@/styles/app/mypage.module.scss";
import Link from "next/link";
import { useEffect, useState } from "react";
import getUserData from "../hooks/fetchDB/getUserData";
import getCookieUserID from "../hooks/getCokkieData/getCookieUserID";
import deleteUser from "../hooks/fetchDB/deleteUser";
import logout from "../hooks/logout";

export default function Quit() {
  const [quitModal, setQuitModal] = useState(false);
  const [userID, setUserID] = useState(0);
  const [loginID, setLoginID] = useState("");
  const [conLoginID, setConLoginID] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    getCookieUserID(setUserID);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let user = await getUserData(userID);
      if (user) {
        setLoginID(user.loginID);
      }
    };
    fetchData();
  }, [userID]);

  const handleSubmit = () => {
    if (loginID !== conLoginID) {
      setError("一致していません。");
    } else {
      deleteUser(userID);
      logout();
      window.location.replace("/");
    }
  };

  return (
    <>
      <Link href={""} onClick={() => setQuitModal(!quitModal)}>
        退会
      </Link>
      {quitModal && (
        <div className={styles.overlay}>
          <div className={styles.upper}>
            <button
              onClick={() => setQuitModal(!quitModal)}
              className={styles.returnBtn}
            >
              ←戻る
            </button>
            <p>退会</p>
          </div>
          <div className={styles.form}>
            <p>
              退会する場合は、
              <br />
              {loginID}
              <br />
              と入力してください。
            </p>
            <input
              type="text"
              value={conLoginID}
              onChange={(e) => setConLoginID(e.target.value)}
            />

            {error ? <p className={styles.error}>{error}</p> : <></>}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!conLoginID}
              className={styles.submitBtn}
            >
              退会
            </button>
          </div>
        </div>
      )}
    </>
  );
}
