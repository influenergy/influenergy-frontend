import type { Metadata } from "next";
import UserProfileLayout from "./UserProfileLayout";

export const metadata: Metadata = {
  title: "Influenergy Demo",
  description: "A modern authentication system built with Next.js",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProfileLayout>{children}</UserProfileLayout>;
}
