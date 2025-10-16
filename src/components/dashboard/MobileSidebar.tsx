"use client";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { useState } from "react";

export function MobileSidebar({ type, className = "" }: { type: string; className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar type={type} className={className} onClose={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  );
}
