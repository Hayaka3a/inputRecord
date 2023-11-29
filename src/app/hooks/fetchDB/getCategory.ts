import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";

export default async function getCategory(
  setCategoryList: Dispatch<SetStateAction<any>>
) {
  const { data, error } = await supabase.from("categories").select("*");
  if (error) {
    console.log("getCategory error!", error.message);
  }
  if (data) {
    setCategoryList(data);
  } else {
    console.log("getCategory error!", "カテゴリーが見つかりませんでした");
  }
}
