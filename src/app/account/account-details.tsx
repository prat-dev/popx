
'use client';

import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {getMockUser, type User} from '@/lib/user';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Separator} from '@/components/ui/separator';

export default function AccountDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const userId = searchParams.get('userId');
    if (userId) {
      const foundUser = getMockUser(userId);
      if (foundUser) {
        setUser(foundUser);
      } else {
        setError('User not found.');
      }
    } else {
      setError('No user ID provided.');
    }
  }, [searchParams]);

  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4 text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <p>Loading...</p>
      </div>
    );
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="p-4">
        <h1 className="text-xl font-bold text-foreground">Account Settings</h1>
      </header>
      <main className="flex-grow p-4 md:p-6">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage
                src={user.avatarUrl}
                alt={user.name}
                data-ai-hint="woman smiling"
              />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 rounded-full bg-primary p-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-foreground"
              >
                <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <path d="M12 19v3" />
              </svg>
            </div>
          </div>
          <div>
            <h2 className="font-bold text-foreground">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <div className="mt-6">
          <p className="text-muted-foreground">
            Welcome to your account page. Here you can manage your personal
            information, update your profile picture, and view your account
            details. Feel free to explore the settings and customize your
            experience.
          </p>
        </div>
        <Separator className="my-6" />
      </main>
    </div>
  );
}
