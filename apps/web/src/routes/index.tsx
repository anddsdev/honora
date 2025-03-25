import { createFileRoute, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { signOut } from '@/web/lib/auth-client';

import { Button } from '../components/ui/button';
import { fallback } from '../lib/constans';

export const Route = createFileRoute('/')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (!context.auth?.isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: search.redirect || fallback,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const handleClick = async () => {
    await signOut();
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-2 text-2xl">
      <Button onClick={handleClick} className="cursor-pointer">
        Sign Out
      </Button>
    </div>
  );
}
