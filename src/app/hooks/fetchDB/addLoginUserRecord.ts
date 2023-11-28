import { supabase } from "@/supabase";

export default async function addLoginUserRecord(data: {
  userID: number;
  title: string;
  memo: string;
  date: Date;
  category: string;
}) {
  const { error } = await supabase.from("record").insert(data);
  if (error) {
    console.log("記録を追加できませんでした", error.message);
  } else {
    console.log("追加しました");
  }
}
