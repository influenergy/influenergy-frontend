"use client";
import { Button } from "@/components/ui/button";
import { useDispatch } from "react-redux";
import { logout } from "@/store/features/authSlice";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import Sidebar from "@/components/dashboard/Sidebar";
import Link from 'next/link';

export default function DashboardPage() { 
  const router = useRouter();
  const dispatch = useDispatch();
  const questionnaireCompleted = document.cookie.includes(
    "questionnaireCompleted=true"
  );

  return (
    <div className="flex min-h-screen">
      <Sidebar userType="creator" />
      <main className="flex-1 p-8 ml-64">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>

        {!questionnaireCompleted ? (
          <Card className="p-6 bg-yellow-100 border border-yellow-400 text-yellow-800">
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
                This is your protected dashboard page. Only authenticated users
                can see this.
              </p>
            </Card>
            {/* Add more dashboard cards and content here */}
          </div>
        )}
      </main>
    </div>
  );
}

function LogoutButton() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };

  return <Button onClick={handleLogout}>Logout</Button>;
}
