"use client";
import styles from "@/styles/app/newrecord.module.scss";
import { Record } from "@/type";
import { useEffect, useState } from "react";
import getNewRecord from "../hooks/fetchDB/getNewRecord";

export default function newRecord() {
  const [recordData, setRecordData] = useState<Record>([]);

  useEffect(() => {
    getNewRecord(setRecordData);
  }, []);

  return (
    <main className={styles.main}>
      <h1>みんなの新着記録</h1>
      <div className={styles.list}>
        {recordData &&
          recordData.map((data) => {
            return (
              <div className={styles.item}>
                <p>
                  {data.users.userName}さんが
                  <br />
                  <span>{data.title}</span>
                  <br />
                  {data.categories.allText}
                </p>
              </div>
            );
          })}
      </div>
    </main>
  );
}
