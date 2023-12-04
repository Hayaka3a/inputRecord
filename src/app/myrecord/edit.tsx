"use client";
import styles from "@/styles/app/myrecord.module.css";
import { Category, Record } from "@/type";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import getCategory from "../hooks/fetchDB/getCategory";
import updateRecord from "../hooks/fetchDB/updateRecord";

export default function RecordEdit({
  data,
  toggleEdit,
  index,
}: {
  data: Record;
  toggleEdit: (index: number) => void;
  index: number;
}) {
  const [title, setTitle] = useState(data.title);
  const [memo, setMemo] = useState(data.memo);
  const [date, setDate] = useState(data.date);
  const [selectCategory, setSelectCategory] = useState(data.category);
  const [userID] = useState(data.userID);
  const [ID] = useState(data.id);
  const [categoryList, setCategoryList] = useState<Category>([]);

  useEffect(() => {
    getCategory(setCategoryList);
  }, []);

  const recordData = {
    id: ID,
    userID: userID,
    title: title,
    memo: memo,
    date: date,
    category: selectCategory,
    yearMonth: "",
  };

  const handleSubmit = () => {
    updateRecord(recordData);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div>
          <button onClick={() => toggleEdit(index)}>×</button>
        </div>
        <p>編集</p>

        <form onSubmit={handleSubmit}>
          <div className={styles.upper}>
            <label>
              日付
              <br />
              <input
                type="date"
                value={date.toString().slice(0, 10)}
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
          <div className={styles.lower}>
            <label>
              <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <div>▼メモ</div>
              <textarea
                onChange={(e) => setMemo(e.target.value)}
                value={memo}
                className={styles.memo}
              />
            </label>
          </div>
          <button type="submit" disabled={!title}>
            変更
          </button>
        </form>
      </div>
    </div>
  );
}
