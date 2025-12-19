import { authClient } from '@/lib/auth-client';
import { useEffect, useRef } from 'react';

export const useCurrentUser = () => {
  const { data: session, error } = authClient.useSession();
  const errorLoggedRef = useRef(false);

  useEffect(() => {
    if (error && !errorLoggedRef.current) {
      // Only log error once to avoid console spam
      if (process.env.NODE_ENV === 'development') {
        console.error('useCurrentUser, error:', error);
      }
      errorLoggedRef.current = true;
    } else if (!error) {
      errorLoggedRef.current = false;
    }
  }, [error]);

  if (error) {
    return null;
  }
  return session?.user;
};
