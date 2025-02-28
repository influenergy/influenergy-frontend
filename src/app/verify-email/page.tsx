"use client";
import EmailVerify from "@/components/auth/EmailVerify";
import { useSearchParams } from "next/navigation";

export default function VerifyEmailPage() {
  const email = useSearchParams().get('email') || "";

  return <EmailVerify email={email} />;
}
