
import {Suspense} from 'react';
import AccountDetails from './account-details';

// This ensures the page is not pre-rendered at build time
export const dynamic = 'force-dynamic';

export default function AccountPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen flex-col items-center justify-center bg-background p-4"><p>Loading...</p></div>}>
      <AccountDetails />
    </Suspense>
  );
}
