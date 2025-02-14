import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <main className="flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-6xl">
          Welcome to Our Platform
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your one-stop solution for managing everything efficiently
        </p>
        <div className="mt-8 flex gap-4">
          <Link href="/login">
            <Button size="lg">Login</Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline">Register</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
