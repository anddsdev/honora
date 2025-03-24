import { createRootRouteWithContext, Outlet, useRouter } from '@tanstack/react-router';
import { RouterContext } from '../context';
import { useSession } from '../lib/auth-client';
import { useEffect } from 'react';

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  const { data } = useSession();
  const { navigate } = useRouter();

  useEffect(() => {
    if (!data?.user) {
      if (!location.pathname.includes('auth/')) {
        navigate({ to: '/auth/sign-in' });
      }
    } else {
      navigate({ to: '/' });
    }
  }, [data, navigate]);

  return (
    <main>
      <Outlet />
    </main>
  );
}
