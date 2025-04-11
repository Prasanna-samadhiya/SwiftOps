// src/components/ProtectedRoute.tsx
'use client';

import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { RootState } from '../../Redux/Store/Store';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const loggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
 console.log(loggedIn)
  // Redirect to login if not authenticated
  if (!loggedIn) {
    router.push('Auth');
    return null; // or a loading spinner if preferred
  }

  return <>{children}</>;
};

export default ProtectedRoute;
