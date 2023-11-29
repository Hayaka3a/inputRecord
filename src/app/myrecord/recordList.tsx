import styles from "@/styles/app/myrecord.module.css";
import { Record } from "@/type";
import { Dispatch, SetStateAction } from "react";
export default function RecordList({
  recordData,
  selectCategory,
  memoOpen,
  setMemoOpen,
  selectYearMonth,
}: {
  recordData: Record;
  selectCategory: string;
  memoOpen: { [key: number]: boolean };
  setMemoOpen: Dispatch<
    SetStateAction<{
      [key: number]: boolean;
    }>
  >;
  selectYearMonth: string;
}) {
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
                    <button>編集</button>
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
              </div>
            );
          })}
    </>
  );
}
