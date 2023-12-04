import { RecordList } from "@/type";
import { Dispatch, SetStateAction } from "react";

export default function createYearMonthsList({
  recordData,
  setYearMonthsList,
}: {
  recordData: RecordList;
  setYearMonthsList: Dispatch<SetStateAction<string[]>>;
}) {
  const tmpYM = recordData.map((data) => data.yearMonth);
  const uniqueYM = [...new Set(tmpYM)];
  setYearMonthsList(uniqueYM);
}
