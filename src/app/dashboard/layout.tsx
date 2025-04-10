import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";

export const metadata: Metadata = {
  title: "Influenergy",
  description:
    "Influenergy is a platform for Influencers to connect with brands and monetize their content. We help Influencers to grow their audience and make money.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <Sidebar type="dashboard" />
      <main className="ml-16 md:ml-[240px] w-full">
        <Header />
        <div className="">{children}</div>
      </main>
    </div>
  );
}
