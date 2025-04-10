import type { Metadata } from "next";
import UserProfileLayout from "./UserProfileLayout";
import Header from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Influenergy ",
  description:
    "Influenergy is a platform for Influencers to connect with brands and monetize their content. We help Influencers to grow their audience and make money.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-h-screen bg-gray-50">
      <Header />
      <UserProfileLayout>{children}</UserProfileLayout>
    </div>
  );
}
