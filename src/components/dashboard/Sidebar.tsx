"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/NavLinks";
import Image from "next/image";
import { selectUser, useAppSelector } from "@/store";
import { LucideIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { useState } from "react";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
  slug: string;
  children?: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
    slug: string;
  }>;
}

interface NavLinks {
  [key: string]: {
    [key: string]: NavItem[];
  };
}

export default function Sidebar({ type }: { type: string }) {
  const user = useAppSelector((state) => state.auth.userType);
  const userProfile = useAppSelector(selectUser);
  const pathname = usePathname();
  // const [active,setActive]=useState("dashboard")

  if (!user) return null;
  const navItems = (navLinks as NavLinks)[user][type];

  return (
    <div className="border-r bg-primary fixed left-0 top-0 h-screen w-16 sm:w-20 md:w-[240px] z-10 transition-all duration-300">
      <div className="flex h-full flex-col gap-2 p-2 md:p-4">
        <Link href="/dashboard" className="flex justify-center items-center">
          <Image
            src="/images/logo-white.svg"
            width={180}
            height={180}
            alt="logo"
            className="w-12 md:w-auto"
          />
        </Link>
        <hr className="my-2 opacity-30" />

        {/* Avatar section with improved responsiveness */}
        <div className="w-full flex flex-col items-center justify-center py-2 md:py-4">
          <Avatar className="h-12 w-12 sm:h-16 sm:w-16 md:h-[100px] md:w-[100px] transition-all duration-300">
            <AvatarImage
              src={
                userProfile?.profileIcon ||
                "https://avatar.iran.liara.run/public/boy"
              }
              alt="@user"
            />
            <AvatarFallback>
              {userProfile?.fullName?.substring(0, 2) || "U"}
            </AvatarFallback>
          </Avatar>
          <p className="text-white text-xs sm:text-sm md:text-base mt-2 truncate max-w-full">
            {userProfile?.fullName}
          </p>
        </div>

        <nav className="grid items-start gap-1 md:gap-2 mt-2">
          {navItems.map((item: NavItem) => (
            <Link key={item.href} href={item.href!}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-center md:justify-start gap-2 md:gap-3 py-2 px-1 md:px-3 hover:text-primary transition-colors",
                  pathname === item.href
                    ? "bg-white text-primary"
                    : "text-white"
                )}  
                // onClick={()=>setActive(item.slug)}
              >
                {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                <p className="text-sm hidden md:block">{item.label}</p>
              </Button>
            </Link>
          ))}
        </nav>

        {/* Settings button */}
        <div className="mt-auto text-center">
          <p className="text-xs md:text-sm text-white hidden md:block">
            © influenergy
          </p>
        </div>
      </div>
    </div>
  );
}
