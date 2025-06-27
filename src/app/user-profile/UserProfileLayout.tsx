"use client";

import Header from "@/components/dashboard/Header";
import { MobileSidebar } from "@/components/dashboard/MobileSidebar";
import Sidebar from "@/components/dashboard/Sidebar";

interface UserProfileLayoutProps {
  children: React.ReactNode;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ children }) => {

  return (
    <div className="flex max-h-screen">
      <div className="hidden md:block">
        <Sidebar type="profile" className="" />
      </div>
      {/* <Sidebar type="profile" className="" /> */}
      <main className="w-full">
      <div className="flex items-center h-16 px-4 border-b bg-white">
          {/* Hamburger menu for mobile */}
          <div className="md:hidden mr-2">
            <MobileSidebar type="dashboard" />
          </div>
          <div className="flex-1">
            <Header />
          </div>
        </div>
        <div className="">{children}</div>
      </main>
    </div>

  );
};

export default UserProfileLayout;
