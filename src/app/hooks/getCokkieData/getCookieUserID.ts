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
      const userID = Number(strID[1]);
      setUserID(userID);
    }
  } else {
    setUserID(0);
  }
}
