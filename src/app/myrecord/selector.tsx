"use client";
import styles from "@/styles/app/myrecord.module.css";
import { Category } from "@/type";
import { Dispatch, SetStateAction } from "react";

export default function Selector({
  categoryList,
  selectCategory,
  setSelectCategory,
  selectYearMonth,
  setSelectYearMonth,
  YearMonthsList,
}: {
  categoryList: Category;
  selectCategory: string;
  setSelectCategory: Dispatch<SetStateAction<string>>;
  selectYearMonth: string;
  setSelectYearMonth: Dispatch<SetStateAction<string>>;
  YearMonthsList: string[];
}) {
  return (
    <div className={styles.select}>
      <label>
        カテゴリー：
        <select
          name="category"
          value={selectCategory}
          onChange={(e) => setSelectCategory(e.target.value)}
        >
          <option value="all" key={0}>
            すべて
          </option>
          {categoryList?.map((data) => {
            return (
              <option value={data.category} key={data.id}>
                {data.category}
              </option>
            );
          })}
        </select>
      </label>

      <label>
        月別：
        <select
          value={selectYearMonth}
          onChange={(e) => setSelectYearMonth(e.target.value)}
        >
          <option value="all">すべて</option>
          {YearMonthsList.map((yearMonth, index) => (
            <option key={index} value={yearMonth}>
              {yearMonth}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
