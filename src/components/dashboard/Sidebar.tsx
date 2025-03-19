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

interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
  children?: Array<{
    href: string;
    label: string;
    icon: LucideIcon;
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

  if (!user) return null;
  const navItems = (navLinks as NavLinks)[user][type];

  return (
    <div className="border-r bg-primary md:block fixed left-0 top-0 h-screen w-16 md:w-[240px] z-10 transition-all duration-300">
      <div className="flex h-full flex-col gap-2 p-4">
        <Link href="/dashboard">
          <Image
            src="/images/logo-white.svg"
            width={200}
            height={200}
            alt="logo"
          />
        </Link>
        <hr />
        <div className="w-full flex flex-col items-center justify-center">
          <Avatar className="h-[100px] w-[100px]">
            <AvatarImage
              src={
                userProfile?.profileIcon ||
                "https://avatar.iran.liara.run/public/boy"
              }
              alt="@user"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <p className="text-white">{userProfile?.fullName}</p>
        </div>

        <nav className="grid items-start gap-2 mt-2">
          {navItems.map((item: NavItem) =>
            item.children ? (
              // Nested navigation
              <Collapsible
                key={item.label}
                open={openItem === item.label}
                onOpenChange={() =>
                  setOpenItem(openItem === item.label ? null : item.label)
                }
              >
                <CollapsibleTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3"
                  >
                    {item.icon && (
                      <item.icon className="h-4 w-4 hover:text-primary" />
                    )}
                    <p className="text-sm md:block hidden text-primary">
                      {item.label}
                    </p>
                    <ChevronsUpDown className="h-4 w-4 ml-7 md:block hidden" />
                  </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="pl-8">
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <Button
                        variant="ghost"
                        className={cn(
                          "w-full justify-start text-sm",
                          pathname === child.href && "bg-white text-primary"
                        )}
                      >
                        {child.icon && <child.icon className="h-4 w-4" />}
                        <p className="text-sm">{child.label}</p>
                      </Button>
                    </Link>
                  ))}
                </CollapsibleContent>
              </Collapsible>
            ) : (
              // Simple navigation
              <Link key={item.href} href={item.href!}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === item.href && "bg-white text-primary"
                  )}
                >
                  {item.icon && <item.icon className="h-4 w-4" />}
                  <p className="text-sm md:block hidden">{item.label}</p>
                </Button>
              </Link>
            )
          )}
        </nav>

        {/* Settings button */}
        <div className="mt-auto ">
        <p className="text-sm text-center text-white md:block hidden">© influenergy</p>
        </div>
      </div>
    </div>
  );
}
