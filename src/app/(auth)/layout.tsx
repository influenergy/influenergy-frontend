"use client";

import Header from "@/components/home/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="">
        <div className="">
          {children}
        </div>
      </main>
    </div>
  );
}
