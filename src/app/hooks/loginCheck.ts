"use client";
import { useState } from "react";
import getCookieUserID from "./getCokkieData/getCookieUserID";
import { useRouter } from "next/navigation";

export default function loginCheck() {
  const [userID, setUserID] = useState(0);
  const router = useRouter();

  getCookieUserID(setUserID);

  if (userID === 0) {
    router.push("/login");
  } else {
    return;
  }
}
