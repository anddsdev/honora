import { createFileRoute, Link, Outlet } from '@tanstack/react-router';

import Github from '@/web/components/icons/github';
import Google from '@/web/components/icons/google';
import { Button } from '@/web/components/ui/button';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

const isLogin = location.pathname.includes('sign-in');

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
            <div className="mb-6 flex justify-center">
              <div className="flex items-center space-x-2 text-2xl font-bold">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <span>Honora</span>
              </div>
            </div>

            <div className="mb-6 text-center">
              <h1 className="text-2xl font-bold">{isLogin ? 'Welcome back' : 'Create your account'}</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {isLogin ? 'Sign in to continue to your account' : 'Fill in your details to get started'}
              </p>
            </div>

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
