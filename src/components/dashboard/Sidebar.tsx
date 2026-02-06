"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/NavLinks";
import Image from "next/image";
import { selectUser, useAppSelector, useAppDispatch } from "@/store";
import { useRouter } from "next/navigation";
import { LucideIcon, UserRoundCog, LogOut, FileText } from "lucide-react";
import { logout, setPendingCollaborationCount } from "@/store/features/authSlice";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { authApi } from "@/services/authServices";
import { usePendingCollaborationCount } from "@/hooks/usePost";
import { useEffect } from "react";


// import { useState } from "react";
const Levels = [
  {
    key: "level_1",
    title: "Level 1 - Rising Creator",
    img: "/bronze-award.svg",
    color: "#b1b1b1", // Bronze
  },
  {
    key: "level_2",
    title: "Level 2 - Active Creator",
    img: "/gold-award.svg",
    color: "#ffbe4b", // Gold
  },
  {
    key: "level_3",
    title: "Level 3 - Pro Creator",
    img: "/diamond-award.svg",
    color: "#32bdd8", // Diamond / Sky Blue
  },
];
interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
  slug: string;
  matchPaths?: string[];
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

const commonLinks: NavItem[] = [
  {
    href: "/dashboard/creator/support",
    icon: UserRoundCog,
    label: "Support",
    slug: "support",
  },
  {
    href: "/dashboard/feedback",
    icon: FileText,
    label: "Feedback",
    slug: "feedback",
  },
];

export default function Sidebar({ type, className, onClose }: { type: string, className: string, onClose?: () => void }) {
  const user = useAppSelector((state) => state.auth.userType);
  const badge = useAppSelector((state) => state.auth.user?.badge);

  const userProfile = useAppSelector(selectUser);

  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { data: pendingCollaborationCount } = usePendingCollaborationCount()

  useEffect(() => {
    if (pendingCollaborationCount !== undefined) {
      dispatch(setPendingCollaborationCount(pendingCollaborationCount));
    }
  }, [pendingCollaborationCount, dispatch]);

  if (!user) return null;
  const navItems = (navLinks as NavLinks)[user][type];

  const handleLogout = async () => {
    try {

      document.documentElement.classList.remove("dark");
      localStorage.clear();
      await authApi.logout(user);
      dispatch(logout());
      router.push("/login");
    }
    catch (error) {
      if (error instanceof Error) {
        console.error("Logout Error:", error.message);
      } else {
        console.error("Logout Error:", error);
      }
    }
  };

  const badgeLevelInfo = Levels.find((lvl) => lvl.key === badge);

  return (
    <div className={`sticky top-0 h-screen min-h-screen border-r bg-primary z-10 transition-all duration-300 flex flex-col justify-between ${className}`}>
      <div className=" flex h-full flex-col gap-2 p-2 md:p-4 overflow-auto">
        <Link href="/dashboard" className="flex justify-center items-center">

          <Image
            src="/images/logo-white.svg"
            width={180}
            height={180}
            alt="logo"
            className="w-20 md:w-auto"
          />
        </Link>
        {/* <hr className="my-2 opacity-30" /> */}

        {/* Avatar section with improved responsiveness */}
        <div className="w-full flex items-center gap-3 py-2">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src={
                  userProfile?.profileIcon ||
                  "https://avatar.iran.liara.run/public/boy"
                }
                alt="@user"
                className="object-cover"
              />
              <AvatarFallback>
                {userProfile?.fullName?.substring(0, 2) || "U"}
              </AvatarFallback>
            </Avatar>

            {/* {badgeLevelInfo && (
              <Image
                src={badgeLevelInfo.img}
                alt="badge"
                width={20}
                height={20}
                className="absolute -top-1 -left-1"
              />
            )} */}
          </div>

          {/* Name + action */}
          <div className="flex flex-col flex-1 min-w-0 gap-2">
            <p className="text-white text-sm font-medium truncate">
              {userProfile?.fullName}
            </p>

            <button
              onClick={() => {
                router.push("/user-profile");
                onClose?.();
              }}
              className="text-xs text-gray-300 hover:text-white underline-offset-2 hover:underline flex items-center gap-1 w-fit border border-gray-300 py-1 px-2 rounded-lg"
            >
              View profile
              {userProfile?.isPasswordSet === false && (
                <Badge variant="destructive" className="text-[10px] px-1 py-0 h-4">
                  !
                </Badge>
              )}
            </button>
          </div>
        </div>

        <hr className="border-white my-5" />

        <nav className="grid items-start gap-1 md:gap-2 mt-2">
          {navItems.map((item: NavItem) => (
            <Link key={item.slug} href={item.href || "#"} className="flex items-center relative" onClick={onClose}>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-2 md:gap-3 py-2 px-1 md:px-3 hover:text-primary transition-colors rounded-lg",
                  item.matchPaths?.some((matchPath) =>
                    pathname.startsWith(matchPath)
                  ) || pathname === item.href
                    ? "bg-white text-primary"
                    : "text-white"
                )}
              >
                {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                <p className="text-sm md:block">{item.label}</p>
              </Button>
            </Link>
          ))}
        </nav>

        <hr className="border-white my-5" />

        {/* Settings button */}
        <div className="text-center">
          <nav className="grid items-start gap-1 md:gap-2">
            {commonLinks.map((item: NavItem) => (
              <Link key={item.slug} href={item.href || "#"} onClick={onClose}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 md:gap-3 py-2 px-1 md:px-3 hover:text-primary transition-colors rounded-lg",
                    item.matchPaths?.some((matchPath) =>
                      pathname.startsWith(matchPath)
                    ) || pathname === item.href
                      ? "bg-white text-primary"
                      : "text-white"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4 flex-shrink-0" />}
                  <p className="text-sm md:block">{item.label}</p>
                </Button>
              </Link>
            ))}
          </nav>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start gap-2 md:gap-3 py-2 px-1 md:px-3 hover:text-primary transition-color text-white"
            )}
            onClick={() => { handleLogout(); onClose?.(); }}
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm md:block">Logout</p>
          </Button>

          <hr className="border-white mt-5 mb-10" />

          <p className="text-sm md:text-sm text-white hidden md:block text-center">
            © 2026 influenergy
          </p>
        </div>
      </div>
    </div>
  );
}
