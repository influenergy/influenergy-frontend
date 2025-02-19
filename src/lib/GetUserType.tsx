"use client";
import { useAppSelector } from "@/store";

export function GetUserType() {
  const user = useAppSelector((state) => state.auth.user);
  console.log("user", user);

  return user;
}
