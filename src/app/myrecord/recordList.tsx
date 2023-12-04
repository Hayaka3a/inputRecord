"use client";
import styles from "@/styles/app/myrecord.module.css";
import { RecordList } from "@/type";
import { useState } from "react";
import RecordEdit from "./edit";
export default function RecordListCom({
  recordData,
  selectCategory,
  selectYearMonth,
}: {
  recordData: RecordList;
  selectCategory: string;
  selectYearMonth: string;
}) {
  const [editOpen, setEditOpen] = useState<{ [key: number]: boolean }>({});
  const toggleEdit = (index: number) => {
    setEditOpen((prev) => ({
      ...prev,
      [index]: !prev[index] || false,
    }));
  };

  const [memoOpen, setMemoOpen] = useState<{ [key: number]: boolean }>({});
  const toggleMemo = (index: number) => {
    setMemoOpen((prevMemoOpen) => ({
      ...prevMemoOpen,
      [index]: !prevMemoOpen[index] || false,
    }));
  };

  return (
    <>
      {recordData &&
        recordData
          .filter((data) => {
            // カテゴリーでのフィルタリング
            const categoryFilter =
              selectCategory === "all" || data.category === selectCategory;
            // 年月でのフィルタリング
            const yearMonthFilter =
              selectYearMonth === "all" || data.yearMonth === selectYearMonth;
            // 両方の条件を満たす場合に表示
            return categoryFilter && yearMonthFilter;
          })
          .map((data, index) => {
            return (
              <div key={index} className={styles.item}>
                <div className={styles.text}>
                  <div className={styles.date}>
                    <p>{String(data.date)}</p>
                    <button onClick={() => toggleEdit(index)}>編集</button>
                  </div>
                  <div>
                    <span onClick={() => toggleMemo(index)}>{data.title}</span>
                    {data.categories.text}
                  </div>
                </div>
                {memoOpen[index] && (
                  <p className={styles.memo} key={index}>
                    {data.memo}
                  </p>
                )}
                {memoOpen[index] && !data.memo && (
                  <p className={styles.memo}>メモはありません。</p>
                )}
                {editOpen[index] && (
                  <RecordEdit
                    data={data}
                    toggleEdit={toggleEdit}
                    index={index}
                  />
                )}
              </div>
            );
          })}
    </>
  );
}
