import { supabase } from "@/supabase";

export default async function deleteUser(userID: number) {
  const { error: userDeleteError } = await supabase
    .from("users")
    .update({ status: true })
    .eq("id", userID);

  if (userDeleteError) {
    console.log("ユーザーを削除できませんでした", userDeleteError.message);
  } else {
    const { error: recordDeleteError } = await supabase
      .from("record")
      .update({ status: true })
      .eq("userID", userID);

    if (recordDeleteError) {
      console.log("レコードを削除できませんでした", recordDeleteError.message);
    } else {
      console.log("削除が完了しました");
    }
  }
}
