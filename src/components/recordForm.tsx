"use client";
import { useEffect, useState } from "react";
import styles from "@/styles/components/recordForm.module.scss";
import getCookieUserID from "@/app/hooks/getCokkieData/getCookieUserID";
import addLoginUserRecord from "@/app/hooks/fetchDB/addLoginUserRecord";
import getCategory from "@/app/hooks/fetchDB/getCategory";
import { Category } from "@/type";

export default function RecordForm() {
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [date, setDate] = useState(new Date());
  const [selectCategory, setSelectCategory] = useState("読書");
  const [memoOpen, setMemoOpen] = useState(false);
  const [ID, setID] = useState(0);
  const [categoryList, setCategoryList] = useState<Category>([]);

  useEffect(() => {
    getCookieUserID(setID);
    getCategory(setCategoryList);
  }, []);

  const recordData = {
    userID: ID,
    title: title,
    memo: memo,
    date: date,
    category: selectCategory,
  };

  const handleSubmit = () => {
    if (ID !== 0) {
      addLoginUserRecord(recordData);
    } else {
      console.log("ゲストなので保存しません！！！！！");
      // ローカルに保存する処理を追加
    }
  };

  const categoryText = categoryList?.find((data) => {
    return data.category === selectCategory;
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
            value={selectCategory}
            onChange={(e) => setSelectCategory(e.target.value)}
          >
            {categoryList?.map((data) => {
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
      <button type="submit" disabled={!title}>
        記録
      </button>
    </form>
  );
}
