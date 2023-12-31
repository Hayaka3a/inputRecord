import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";

export default async function loginCheck({
  loginID,
  pw,
  setError,
}: {
  loginID: string;
  pw: string;
  setError: Dispatch<SetStateAction<boolean>>;
}) {
  try {
    const { data } = await supabase
      .from("users")
      .select("userName,id")
      .eq("loginID", loginID)
      .eq("pw", pw)
      .eq("status", false);

    if (data && data.length > 0) {
      return {
        status: "ok",
        userName: data[0].userName,
        userID: data[0].id,
      };
    } else {
      setError(true);
      return { status: "error", message: "Invalid userID or password." };
    }
  } catch (error) {
    setError(true);
    console.error("Error during login:", error);
    return { status: "error", message: "An error occurred during login." };
  }
}
