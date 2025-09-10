"use client";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileActionsProps = {
  className?: string;
};

export default function ProfileActions({ className }: ProfileActionsProps) {
  return (
    <Button
      className={cn(
        "bg-primary cursor-pointer text-white border-2 border-white rounded-full absolute bottom-0 right-2 h-10 w-10",
        className
      )}
    >
      <PenLine size={20} />
    </Button>
  );
}
