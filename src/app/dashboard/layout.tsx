import type { Metadata } from "next";
import Sidebar from "@/components/dashboard/Sidebar";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";

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
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar: hidden on mobile, visible on md+ */}
      <div className="hidden md:block">
        <Sidebar type="dashboard" className="" />
      </div>

      {/* Main content */}
      <main className="w-full overflow-y-scroll overflow-x-hidden flex flex-col">
        {/* Top Header Bar */}
        <div className="flex items-centerbg-white dark:bg-background transition-colors duration-300">
          {/* Hamburger menu for mobile */}
          <div className="md:hidden mr-2">
            <MobileSidebar type="dashboard" />
          </div>

          {/* Main header content */}
          {/* <div className="flex-1 ">
            <Header />
          </div> */}

        </div>

        {/* Page content */}
        <div className="flex-1 ">{children}</div>
      </main>
    </div>
  );
}
