import { supabase } from "@/supabase";
import { User } from "@/type";

export default async function getUserData(id?: number, loginID?: string) {
  if (id) {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", id)
      .eq("status", false);
    if (error) {
      console.log("getUserData error!", error.message);
    } else {
      if (data) {
        return data[0] as User;
      } else {
        console.log("getUserData undefined");
      }
    }
  } else {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("loginID", loginID)
      .eq("status", false);
    if (error) {
      console.log("getUserData error!", error.message);
    } else {
      if (data) {
        return data[0] as User;
      } else {
        console.log("getUserData undefined");
      }
    }
  }
}
