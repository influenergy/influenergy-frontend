"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouteProtection } from "@/hooks/useRouteProtection";
import { selectUser, useAppSelector } from "@/store";

export default function DashboardPage() {
  const isAuthenticated = useRouteProtection();
    const user = useAppSelector(selectUser);
  if (!isAuthenticated) {
    return null; // Or a loading spinner
  }


  return (
    <div className="min-h-screen">
      {/* main content */}

      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {!user?.isProfileCompleted ? (
        <Card className="p-6 bg-violet-100 border border-violet-400 text-black">
          <h2 className="text-xl font-semibold mb-2">
            Complete Your Preferences
          </h2>
          <p className="text-muted-foreground">
            Please complete the questionnaire to personalize your dashboard
            experience.
          </p>
          <Link href="/questionnaire">
            <Button className="mt-4">Go to Questionnaire</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground">
              This is your protected dashboard page. Only you
              can see this.
            </p>
          </Card>
          {/* Add more dashboard cards and content here */}
        </div>
      )}
    </div>
  );
}
