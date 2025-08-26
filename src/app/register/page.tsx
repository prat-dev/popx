import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function RegisterPage() {
  const RequiredLabel = ({ htmlFor, children }: { htmlFor: string, children: React.ReactNode }) => (
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
          <Input id="name" placeholder="Marry Doe" />
        </div>
        <div className="space-y-2">
          <RequiredLabel htmlFor="phone">Phone number</RequiredLabel>
          <Input id="phone" type="tel" placeholder="Marry Doe" />
        </div>
        <div className="space-y-2">
          <RequiredLabel htmlFor="email">Email address</RequiredLabel>
          <Input id="email" type="email" placeholder="Marry Doe" />
        </div>
        <div className="space-y-2">
          <RequiredLabel htmlFor="password">Password</RequiredLabel>
          <Input id="password" type="password" placeholder="Marry Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="company" className="text-primary">Company name</Label>
          <Input id="company" placeholder="Marry Doe" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-primary">Are you an Agency?<span className="text-red-500">*</span></p>
          <RadioGroup defaultValue="yes" className="flex items-center space-x-4">
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
        <Button className="w-full">Create Account</Button>
      </div>
    </div>
  );
}
