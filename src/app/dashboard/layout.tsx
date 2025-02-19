import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
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
    <div className="flex min-h-screen">
      <Sidebar type="dashboard" />
      <main className="ml-16 md:ml-[240px] w-full">
        <Header />
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
