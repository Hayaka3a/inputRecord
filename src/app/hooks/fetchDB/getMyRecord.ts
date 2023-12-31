import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";
import { RecordList } from "@/type";

export default async function getMyRecord(
  userID: number,
  setRecordData: Dispatch<SetStateAction<RecordList>>
) {
  const { data, error } = await supabase
    .from("record")
    .select("*,users(userName),categories(text)")
    .eq("userID", userID)
    .order("date", { ascending: false })
    .order("id", { ascending: false });

  if (error) {
    console.log("getMyRecord error!", error.message);
  }
  if (data) {
    setRecordData(data);
    return data;
  }
}
