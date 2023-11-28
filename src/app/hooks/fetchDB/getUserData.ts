import { supabase } from "@/supabase";

export default async function getUserData(email: string) {
  const { data, error } = await supabase
    .from("users")
    .select("id,userName")
    .eq("email", email);

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
