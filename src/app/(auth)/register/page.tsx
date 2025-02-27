"use client"
import BrandRegisterForm from "@/components/auth/BrandForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAppSelector } from "@/store";

export default function RegisterPage() {
  const userType = useAppSelector((state) => state.auth.userType);

  if (!userType) {
    return null;
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      {userType == "creator" ? (
        <RegisterForm userType={userType} />
      ) : (
        <BrandRegisterForm userType={userType} />
      )}
    </div>
  );
}
