// Clerk hook usage example for reference
import { useUser } from '@clerk/clerk-react';

export function Example() {
  const { user } = useUser();
  return <div>{user?.emailAddresses[0]?.emailAddress}</div>;
}
