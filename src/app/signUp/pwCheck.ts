import { Dispatch, SetStateAction } from "react";

export default function pwCheck(
  pw: string,
  conPw: string,
  setPassError: Dispatch<SetStateAction<string>>
) {
  if (pw !== conPw) {
    setPassError("パスワードが一致しません");
  } else {
    setPassError("");
  }
}
