"use client";

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
        <div className="">{children}</div>
      </main>
    </div>

  );
};

export default UserProfileLayout;
