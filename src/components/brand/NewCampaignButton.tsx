"use client";

import { usePathname, useRouter } from "next/navigation";

type Props = {
  label?: string;
};

export default function NewCampaignButton({ label = "Create New Campaign" }: Props) {
  const router = useRouter();
  const pathname = usePathname();

  const handleClick = () => {
    const basePath = pathname.split("/").slice(0, -1).join("/");
    router.push(`/dashboard/brand/create-campaign`);
  };

  return (
    <button
      onClick={handleClick}
      className="px-3 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 flex items-center gap-2 text-sm"
    >
      <span className="text-sm">+</span>
      {label}
    </button>
  );
}
