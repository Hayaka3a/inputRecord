import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";

export default async function emailCheck(
  email: string,
  setEmailError: Dispatch<SetStateAction<string>>
) {
  const { data } = await supabase
    .from("users")
    .select("email")
    .eq("email", email);

  if (data && data.length > 0) {
    setEmailError("すでに登録されているユーザーです");
  } else {
    setEmailError("");
  }
}
