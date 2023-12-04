import { supabase } from "@/supabase";
import processYearMonthData from "../processYearMonthData";

export default async function updateRecord(data: {
  userID: number;
  title: string;
  memo: string;
  date: Date;
  category: string;
  yearMonth: string;
  id: number;
}) {
  const yearMonth = processYearMonthData(data.date);
  data.yearMonth = yearMonth;

  const { error } = await supabase
    .from("record")
    .update(data)
    .eq("id", data.id);

  if (error) {
    console.log("記録を追加できませんでした", error.message);
  } else {
    console.log("追加しました");
  }
}
