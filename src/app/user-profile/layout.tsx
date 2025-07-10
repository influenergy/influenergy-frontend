import type { Metadata } from "next";
import UserProfileLayout from "./UserProfileLayout";
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
    <div className="min-h-screen bg-gray-50">
        <UserProfileLayout>{children}</UserProfileLayout>
    </div>
  );
}
