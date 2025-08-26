
'use client';

import {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {createUser} from '@/lib/user';
import {useToast} from '@/hooks/use-toast';

export default function RegisterPage() {
  const router = useRouter();
  const {toast} = useToast();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [isAgency, setIsAgency] = useState('yes');

  const handleCreateAccount = () => {
    if (!name || !email || !password || !phone) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }
    const newUser = createUser({name, email});
    router.push(`/account?userId=${newUser.id}`);
  };

  const RequiredLabel = ({
    htmlFor,
    children,
  }: {
    htmlFor: string;
    children: React.ReactNode;
  }) => (
    <Label htmlFor={htmlFor} className="text-primary">
      {children} <span className="text-red-500">*</span>
    </Label>
  );

  return (
    <div className="flex h-screen flex-col bg-background p-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Create your
          <br />
          PopX account
        </h1>
      </div>
      <div className="mt-8 space-y-4">
        <div className="space-y-2">
          <RequiredLabel htmlFor="name">Full Name</RequiredLabel>
          <Input
            id="name"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <RequiredLabel htmlFor="phone">Phone number</RequiredLabel>
          <Input
            id="phone"
            type="tel"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <RequiredLabel htmlFor="email">Email address</RequiredLabel>
          <Input
            id="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <RequiredLabel htmlFor="password">Password</RequiredLabel>
          <Input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-primary">
            Company name
          </Label>
          <Input
            id="company"
            placeholder="Enter company name"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">
            Are you an Agency?<span className="text-red-500">*</span>
          </p>
          <RadioGroup
            defaultValue="yes"
            className="flex items-center space-x-4"
            onValueChange={setIsAgency}
            value={isAgency}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="yes" id="agency-yes" />
              <Label htmlFor="agency-yes">Yes</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="no" id="agency-no" />
              <Label htmlFor="agency-no">No</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
      <div className="flex-grow"></div>
      <div className="w-full max-w-sm">
        <Button onClick={handleCreateAccount} className="w-full">
          Create Account
        </Button>
      </div>
    </div>
  );
}
