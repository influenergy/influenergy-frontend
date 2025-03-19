"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouteProtection } from "@/hooks/useRouteProtection";
import { selectUser, useAppSelector } from "@/store";

export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
  const user = useAppSelector(selectUser);
  const userType = useAppSelector((state) => state.auth.userType);

  if (!isAuthenticated || !userType) {
    return null;
  }


  return (
    <div className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {userType === "creator" && !user?.isProfileCompleted ? (
        <Card className="p-6 bg-violet-100 border border-violet-400 text-black">
          <h2 className="text-xl font-semibold mb-2">
            Complete Your Preferences
          </h2>
          <p className="text-muted-foreground">
            Please complete the questionnaire to personalize your dashboard
            experience and help us match you with the right brands.
          </p>
          <Link href="/questionnaire">
            <Button className="mt-4">Go to Questionnaire</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">
              Welcome Back, {userType === "creator" ? "Creator" : "Brand"}!
            </h2>
            <p className="text-muted-foreground">
              {userType === "creator"
                ? "Your creator dashboard is ready. Start exploring opportunities!"
                : "Your brand dashboard is ready. Start connecting with creators!"}
            </p>
          </Card>
          {/* Add more dashboard cards and content here */}
        </div>
      )}
    </div>
  );
}
