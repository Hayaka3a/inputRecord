import { supabase } from "@/supabase";

export default async function getUserData(loginID: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id,userName")
    .eq("loginID", loginID);

  if (error) {
    console.log("getUserData error!", error.message);
  } else {
    if (data) {
      return data[0];
    } else {
      console.log("getUserData undefined");
    }
  }
}
