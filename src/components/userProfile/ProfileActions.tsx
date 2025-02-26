"use client";
import { Button } from "@/components/ui/button";
import { PenLine } from "lucide-react";

export default function ProfileActions() {
  return (
    <Button className="bg-primary text-white border-2 border-white rounded-full absolute bottom-0 right-2 h-10 w-10">
      <PenLine size={20} />
    </Button>
  );
}
