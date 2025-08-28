"use client";
import { useEffect, Suspense } from "react";
import { useAppDispatch } from "@/store";
import { setUserType } from "@/store/features/authSlice";
import dynamic from "next/dynamic";
import { useSearchParams, useRouter } from "next/navigation";

// Disable SSR for LoginForm since it may use browser APIs
const LoginForm = dynamic(() => import("@/components/auth/LoginForm"), { ssr: false });

function LoginPageInner() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const role = searchParams.get("role");
    if (role) {
      dispatch(setUserType(role));
      router.replace("/login"); // strip query param
    }
  }, [searchParams, dispatch, router]);

  return (
    <div className="flex min-h-screen items-center justify-center relative">
      <LoginForm />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageInner />
    </Suspense>
  );
}
