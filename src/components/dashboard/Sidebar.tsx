"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { navLinks } from "@/constants/NavLinks";

export default function Sidebar({ userType }: { userType: "creator" | "brand" }) {
  const pathname = usePathname();
  
  const navItems = navLinks[userType];

  return (
    <div className="hidden border-r bg-muted/40 md:block w-64 fixed left-0 top-0 h-screen">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex-1">
          <nav className="grid items-start gap-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-3",
                    pathname === item.href && "bg-accent"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>
        </div>
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
              Settings
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}