
import {Suspense} from 'react';
import AccountDetails from './account-details';

export default function AccountPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AccountDetails />
    </Suspense>
  );
}
