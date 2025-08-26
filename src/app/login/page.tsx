import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="flex h-screen flex-col bg-background p-8">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-foreground">
          Signin to your PopX account
        </h1>
        <p className="mt-2 text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="mt-8 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-primary">Email Address</Label>
          <Input id="email" type="email" placeholder="Enter email address" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password"  className="text-primary">Password</Label>
          <Input id="password" type="password" placeholder="Enter password" />
        </div>
      </div>
       <div className="flex-grow"></div>
      <div className="w-full max-w-sm space-y-2">
        <Button asChild variant="secondary" className="w-full bg-muted text-muted-foreground">
          <Link href="/account">Login</Link>
        </Button>
      </div>
    </div>
  );
}
