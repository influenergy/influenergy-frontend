import dynamic from 'next/dynamic';

// Use dynamic import with ssr: false to prevent server-side rendering of components that use browser APIs
const LoginForm = dynamic(() => import('@/components/auth/LoginForm'), { ssr: false });

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoginForm />
    </div>
  );
}
