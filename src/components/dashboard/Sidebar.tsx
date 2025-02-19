"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/NavLinks";
import Image from "next/image";
import { useAppSelector } from "@/store";
import { LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface NavItem {
  href?: string;
  icon: LucideIcon;
  label: string;
  children?: Array<{
    href: string;
    label: string;
  }>;
}

interface NavLinks {
  [key: string]: {
    [key: string]: NavItem[];
  };
}

export default function Sidebar({ type }: { type: string }) {
  const user = useAppSelector((state) => state.auth.userType);
  const pathname = usePathname();
  const [openItem, setOpenItem] = useState<string | null>(null);

  if (!user) return null;
  const navItems = (navLinks as NavLinks)[user][type];

  return (
    <div className="border-r bg-white md:block fixed left-0 top-0 h-screen w-16 md:w-[240px] z-10 transition-all duration-300">
      <div className="flex h-full flex-col gap-2 p-4">
        <Image src="/images/logo.svg" width={200} height={200} alt="logo" />
        <nav className="grid items-start gap-2 mt-10">
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
                    {item.icon && <item.icon className="h-4 w-4" />}
                    <p className="text-sm md:block hidden">{item.label}</p>
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
                          pathname === child.href && "bg-secondary"
                        )}
                      >
                        {child.label}
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
                    pathname === item.href && "bg-secondary"
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
        <div className="mt-auto">
          <Link href="/dashboard/settings">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start gap-3",
                pathname === "/dashboard/settings" && "bg-accent"
              )}
            >
              <Settings className="h-4 w-4" />
              <p className="text-sm md:block hidden">Settings</p>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
