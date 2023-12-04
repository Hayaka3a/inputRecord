import { supabase } from "@/supabase";
import processYearMonthData from "../processYearMonthData";

export default async function addRecord(data: {
  userID: number;
  title: string;
  memo: string;
  date: Date;
  category: string;
  yearMonth: string;
}) {
  const yearMonth = processYearMonthData(data.date);
  data.yearMonth = yearMonth;

  const { error } = await supabase.from("record").insert(data);
  if (error) {
    console.log("記録を追加できませんでした", error.message);
  } else {
    console.log("追加しました");
  }
}
