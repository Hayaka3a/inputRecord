import { supabase } from "@/supabase";

export default async function addUser(sendData: {
  email: string;
  pw: string;
  userName: string;
  status: boolean;
}) {
  const { error } = await supabase.from("users").insert(sendData);
  if (error) {
    return { status: "error", error: error.message };
  } else {
    return { status: "ok" };
  }
}
