"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/components/recordForm.module.scss";
import getCookieUserID from "@/app/hooks/getCokkieData/getCookieUserID";
import addLoginUserRecord from "@/app/hooks/fetchDB/addLoginUserRecord";

export default function RecordForm() {
  const tmpData = [
    { id: 1, category: "読書", text: "を読みました" },
    { id: 2, category: "映画", text: "を観ました" },
    { id: 3, category: "学習", text: "を学習しました" },
  ];

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(new Date());
  const [category, setCategory] = useState("読書");
  const [memoOpen, setMemoOpen] = useState(false);
  const [ID, setID] = useState(0);

  useEffect(() => {
    getCookieUserID(setID);
  }, []);

  const recordData = {
    userID: ID,
    title: title,
    memo: memo,
    date: date,
    category: category,
  };

  const handleSubmit = async () => {
    if (ID !== 0) {
      addLoginUserRecord(recordData);
    } else {
      console.log("ゲストなので保存しません！！！！！");
      // ローカルに保存する処理を追加
    }
  };

  const categoryText = tmpData.find((data) => {
    return data.category === category;
  });

  return (
    <form onSubmit={handleSubmit} className={styles.main}>
      <div className={styles.upper}>
        <label>
          日付
          <br />
          <input
            type="date"
            value={date.toISOString().slice(0, 10)}
            onChange={(e) => setDate(new Date(Date.parse(e.target.value)))}
          />
        </label>
        <label>
          カテゴリー
          <br />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {tmpData.map((data) => {
              return (
                <option value={data.category} key={data.id}>
                  {data.category}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <p>{categoryText && categoryText.text}</p>
      </label>
      <label>
        <div onClick={() => setMemoOpen(!memoOpen)}>▼メモ欄</div>
        {memoOpen && (
          <textarea
            onChange={(e) => setMemo(e.target.value)}
            value={memo}
            className={styles.memo}
          />
        )}
      </label>
      <button type="submit">記録</button>
    </form>
  );
}
