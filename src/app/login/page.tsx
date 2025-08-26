
'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {findUserByEmail} from '@/lib/user';
import {useToast} from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const {toast} = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    const user = findUserByEmail(email);
    if (user) {
      // In a real app, you'd also verify the password
      router.push(`/account?userId=${user.id}`);
    } else {
      toast({
        title: 'Login Failed',
        description: 'Invalid email or password.',
        variant: 'destructive',
      });
    }
  };

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
          <Label htmlFor="email" className="text-primary">
            Email Address
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password" className="text-primary">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="w-full max-w-sm space-y-2">
        <Button
          onClick={handleLogin}
          variant="secondary"
          className="w-full bg-muted text-muted-foreground"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
