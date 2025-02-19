"use client";

import Sidebar from "@/components/dashboard/Sidebar";

interface UserProfileLayoutProps {
  children: React.ReactNode;
}

const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({ children }) => {

  return (
    <div className="flex min-h-screen">
      <Sidebar type="profile" />
      <main className="ml-16 md:ml-[240px] w-full">
        <div className="">{children}</div>
      </main>
    </div>
  );
};

export default UserProfileLayout;
