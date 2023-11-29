import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";

export default async function loginIDCheck(
  loginID: string,
  setloginIDError: Dispatch<SetStateAction<string>>
) {
  const { data } = await supabase
    .from("users")
    .select("loginID")
    .eq("loginID", loginID);

  if (data && data.length > 0) {
    setloginIDError("すでに登録されているユーザーIDです");
  } else {
    setloginIDError("");
  }
}
