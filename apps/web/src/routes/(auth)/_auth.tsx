/* eslint-disable style/multiline-ternary */
import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router';

import Github from '@/web/components/icons/github';
import Google from '@/web/components/icons/google';
import { Button } from '@/web/components/ui/button';

import { AuthFormHeading } from '../../components/auth-form-heading';

export const Route = createFileRoute('/(auth)/_auth')({
  beforeLoad: ({ context, location }) => {
    if (context.auth) {
      throw redirect({
        to: '/',
        search: location.search,
      });
    }
  },
  component: RouteComponent,
});

const socialIcons = [
  {
    name: 'Google',
    icon: Google,
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Google');
    },
  },
  {
    name: 'GitHub',
    icon: Github,
    action: () => {
      // eslint-disable-next-line no-console
      console.log('Github');
    },
  },
];

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background/80 to-background p-4">
      <div className="w-full max-w-md">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-background to-background/80 p-8 shadow-xl border border-border/50">
          <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" />
          <div className="relative z-10">
            <AuthFormHeading />

            <Outlet />

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border/50"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {socialIcons.map(({ name, icon: Icon, action }) => (
                  <Button
                    key={name}
                    type="button"
                    variant="outline"
                    className="border-input/50 bg-background/50 backdrop-blur-sm cursor-pointer"
                    onClick={action}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-muted-foreground">
            <p className="flex gap-1">
              By continuing, you agree to our
              <Link to="/legal" className="text-orange-500 hover:text-orange-600">
                Terms of Service
              </Link>
              and
              <Link to="/legal" className="text-orange-500 hover:text-orange-600">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
