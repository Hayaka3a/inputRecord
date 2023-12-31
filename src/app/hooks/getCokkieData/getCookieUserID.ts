import { Dispatch, SetStateAction } from "react";

export default function getCookieUserID(
  setUserID: Dispatch<SetStateAction<number>>
) {
  const cookie = document.cookie;
  const cookiesArray = cookie.split(";");

  if (cookiesArray) {
    const strID = cookiesArray
      .find((cookie) => cookie.includes("userID"))
      ?.split("=");

    if (strID) {
      const userID = strID[1];
      setUserID(Number(userID));
      return userID;
    }
  } else {
    setUserID(0);
    return;
  }
  if (!cookie) {
    return;
  }
}
