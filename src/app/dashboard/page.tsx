import { Button } from '@/components/ui/button';

import { useDispatch } from 'react-redux';
import { logout } from '@/store/features/authSlice';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';

export default function DashboardPage() {
  return (
    <div className="min-h-screen p-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-2">Welcome Back!</h2>
            <p className="text-muted-foreground">
              This is your protected dashboard page. Only authenticated users can see this.
            </p>
          </Card>
          
          {/* Add more dashboard cards and content here */}
        </div>
      </div>
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

  return (
    <Button variant="outline" onClick={handleLogout}>
      Logout
    </Button>
  );
}
