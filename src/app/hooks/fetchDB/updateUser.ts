import { supabase } from "@/supabase";

export default async function updateUser(data: {
  userID: number;
  userName: string;
  pw: string;
}) {
  const { error } = await supabase
    .from("users")
    .update({ userName: data.userName, pw: data.pw })
    .eq("id", data.userID);

  if (error) {
    console.log("記録を追加できませんでした", error.message);
  } else {
    console.log("追加しました");
  }
}
