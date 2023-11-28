import { Dispatch, SetStateAction } from "react";

export default function getCookieUserName(
  setUserName: Dispatch<SetStateAction<string>>
) {
  const cookie = document.cookie;
  const cookiesArray = cookie.split(";");
  if (cookiesArray) {
    const userName = cookiesArray
      .find((cookie) => cookie.includes("userName"))
      ?.split("=");
    if (userName) {
      setUserName(userName[1]);
    }
  } else {
    setUserName("ゲスト");
  }
}
