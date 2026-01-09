"use client";

import { Button } from "@/components/ui/button";

type CreatorCardProps = {
  creator: any;
  status: string;
  onAction: (nextStatus: "Interested" | "Offered" | "Rejected" | "Payment") => void;
};

export default function CreatorCard({
  creator,
  status,
  onAction,
}: CreatorCardProps) {
  const getAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();

    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const age = creator?.profile?.dob
    ? getAge(creator.profile.dob)
    : null;

  const statusStyles: Record<string, string> = {
    Applied: "bg-blue-100 text-blue-700 border border-blue-300",
    Shortlisted: "bg-purple-100 text-purple-700 border border-purple-300",
    Offered: "bg-green-100 text-green-700 border border-green-300",
    Rejected: "bg-red-100 text-red-700 border border-red-300",
  };


  return (
    <div className="relative flex items-center gap-4 p-4 bg-white dark:bg-card border border-gray-400 rounded-xl shadow-sm hover:shadow-md transition">

      {/* LEFT: Profile + Info */}
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border shrink-0">
          <img
            src={creator.profileIcon}
            alt={creator.fullName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="min-w-0">
          <h3 className="text-lg font-semibold truncate">
            {creator.fullName}
          </h3>

          <p className="text-sm text-muted-foreground">
            {creator.profile?.city || "Unknown location"}
            {age && ` • ${age} yrs`}
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {creator.profile?.category?.map((cat: string, index: number) => (
              <span
                key={index}
                className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Status Badge - TOP RIGHT */}
      {status && (
        <span
          className={`absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full ${statusStyles[status] ?? "bg-gray-100 text-gray-700 border border-gray-300"
            }`}
        >
          {status}
        </span>
      )}

      {/* Actions - BOTTOM RIGHT */}
      <div className="absolute bottom-3 right-3 flex items-center gap-2">

        {/* Applied (was Pending) */}
        {status === "Applied" && (
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={() => onAction("Interested")}
          >
            Interested
          </Button>
        )}

        {/* Shortlisted (was Interested) */}
        {status === "Shortlisted" && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => onAction("Offered")}
          >
            Send Offer
          </Button>
        )}

        {/* Offered */}
        {status === "Offered" && (
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-300 whitespace-nowrap">
            Offer sent • Waiting for creator
          </span>
        )}


        {/* Offered */}
        {status === "Offer Accepted" && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() => onAction("Payment")}
          >
            Pay Now
          </Button>
        )}

        {/* Reject - ALWAYS */}
        <Button
          variant="outline"
          className="border-red-500 text-red-500 hover:text-white hover:bg-red-600"
          onClick={() => onAction("Rejected")}
        >
          Reject
        </Button>
      </div>

    </div>

  );
}
