"use client";
import { Category, RecordList } from "@/type";
import { useEffect, useState } from "react";
import styles from "@/styles/app/myrecord.module.css";
import getMyRecord from "../hooks/fetchDB/getMyRecord";
import getCookieUserID from "../hooks/getCokkieData/getCookieUserID";
import getCategory from "../hooks/fetchDB/getCategory";
import Selector from "./selector";
import RecordListCom from "./recordList";
import createYearMonthsList from "./createYearMonthsList";

export default function myRecord() {
  const [recordData, setRecordData] = useState<RecordList>([]);
  const [userID, setUserID] = useState(0);
  const [categoryList, setCategoryList] = useState<Category>([]);
  const [selectCategory, setSelectCategory] = useState("all");

  const [selectYearMonth, setSelectYearMonth] = useState("all");
  const [yearMonthsList, setYearMonthsList] = useState([""]);

  useEffect(() => {
    getCategory(setCategoryList);
    getCookieUserID(setUserID);
  }, []);

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const data = await getMyRecord(userID, setRecordData);
        if (data) {
          isMounted = false;
        }
      } catch (error) {
        console.error("データの取得中にエラーが発生しました", error);
      }
    };
    if (recordData.length === 0 && isMounted) {
      fetchData();
    }

    createYearMonthsList({ recordData, setYearMonthsList });

    return () => {
      isMounted = false;
    };
  }, [recordData.length, userID]);

  return (
    <main className={styles.main}>
      <h1>自分の記録</h1>
      <Selector
        categoryList={categoryList}
        selectCategory={selectCategory}
        setSelectCategory={setSelectCategory}
        selectYearMonth={selectYearMonth}
        setSelectYearMonth={setSelectYearMonth}
        YearMonthsList={yearMonthsList}
      />
      <RecordListCom
        recordData={recordData}
        selectCategory={selectCategory}
        selectYearMonth={selectYearMonth}
      />
    </main>
  );
}
