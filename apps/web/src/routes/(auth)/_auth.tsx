/* eslint-disable style/multiline-ternary */
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { z } from 'zod';

import { fallback } from '@/web/lib/constans';

export const Route = createFileRoute('/(auth)/_auth')({
  validateSearch: z.object({
    redirect: z.string().optional().catch(''),
  }),
  beforeLoad: ({ context, search }) => {
    if (context.auth?.isAuthenticated) {
      throw redirect({
        to: '/',
        search: search.redirect || fallback,
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return <Outlet />;
}
