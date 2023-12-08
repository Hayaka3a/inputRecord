import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";
import { RecordList } from "@/type";

export default async function getNewRecord(
  setRecordData: Dispatch<SetStateAction<RecordList>>
) {
  const { data, error } = await supabase
    .from("record")
    .select("*,users(userName),categories(allText)")
    .order("date", { ascending: false })
    .order("id", { ascending: false })
    .limit(8)
    .eq("status", false);

  if (error) {
    console.log("getMyRecord error!", error.message);
  }
  if (data) {
    setRecordData(data);
    return data;
  }
}
