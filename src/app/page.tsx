import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex h-screen flex-col bg-background font-body">
      <div className="flex-grow"></div>
      <div className="flex flex-col items-center justify-center p-8">
        <div className="w-full max-w-sm text-left">
          <h1 className="text-3xl font-bold text-foreground">
            Welcome to PopX
          </h1>
          <p className="mt-2 text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          </p>
        </div>
        <div className="w-full max-w-sm mt-8 space-y-2">
          <Button asChild className="w-full">
            <Link href="/register">Create Account</Link>
          </Button>
          <Button asChild variant="secondary" className="w-full">
            <Link href="/login">Already Registered? Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
