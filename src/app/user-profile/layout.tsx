import type { Metadata } from "next";
import UserProfileLayout from "./UserProfileLayout";
import Header from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Influenergy Demo",
  description: "A modern authentication system built with Next.js",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <UserProfileLayout>{children}</UserProfileLayout>
    </div>
  );
}
