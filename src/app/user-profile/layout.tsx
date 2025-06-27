import type { Metadata } from "next";
import UserProfileLayout from "./UserProfileLayout";
import Header from "@/components/dashboard/Header";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";

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
       <div className="flex-1">
        <div className="flex items-center h-16 px-4 border-b bg-white">
          {/* Hamburger menu for mobile */}
          <div className="md:hidden mr-2">
            <MobileSidebar type={"profile"} />
          </div>
          <div className="flex-1">
            <Header />
          </div>
        </div>
        </div>
      <UserProfileLayout>{children}</UserProfileLayout>
    </div>
  );
}
