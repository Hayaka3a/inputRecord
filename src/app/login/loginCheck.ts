import { supabase } from "@/supabase";
import { Dispatch, SetStateAction } from "react";
import { FALSE } from "sass";

export default async function loginCheck({
  email,
  pw,
  setError,
}: {
  email: string;
  pw: string;
  setError: Dispatch<SetStateAction<boolean>>;
}) {
  try {
    const { data } = await supabase
      .from("users")
      .select("userName,id")
      .eq("email", email)
      .eq("pw", pw)
      .eq("status", false);

    if (data && data.length > 0) {
      return { status: "ok", userName: data[0].userName, id: data[0].id };
    } else {
      setError(true);
      return { status: "error", message: "Invalid email or password." };
    }
  } catch (error) {
    setError(true);
    console.error("Error during login:", error);
    return { status: "error", message: "An error occurred during login." };
  }
}
