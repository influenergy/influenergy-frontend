"use client";
import EmailVerify from "@/components/auth/EmailVerify";
import { Loader } from "@/components/common/Loader";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function EmailVerifyWrapper() {
  const email = useSearchParams().get("email") || "";
  return <EmailVerify email={email} />;
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<Loader />}>
      <EmailVerifyWrapper />
    </Suspense>
  );
}
