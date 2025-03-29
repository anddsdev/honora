/* eslint-disable style/multiline-ternary */
import { signInSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight, EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { SocialIcons } from '@/web/components/social-icons';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Label } from '@/web/components/ui/label';
import { Separator } from '@/web/components/ui/separator';

import { FieldInfo } from '../../components/field-info';
import { signIn } from '../../lib/auth-client';

export const Route = createFileRoute('/(auth)/_auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: signInSchema,
    },
    async onSubmit({ value, formApi }) {
      await signIn.email(
        {
          email: value.email,
          password: value.password,
        },
        {
          onSuccess: () => {
            toast.success('Sign in successful');
            navigate({ to: '/' });
          },
          onError: ({ error }) => {
            toast.error(error.message, {
              duration: 5000,
              action: {
                label: 'Try again',
                onClick: () => {
                  formApi.setFieldValue('password', '');
                },
              },
            });
          },
        },
      );
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(e);
  };

  const toggleVisibility = () => setIsVisible((prevState: boolean) => !prevState);

  return (
    <div className="w-full max-w-md px-8">
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Welcome back</h1>
        <p className="mt-1 text-sm text-muted-foreground">Sign in to continue to your account</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <form.Field
            name="email"
            children={(field) => {
              return (
                <div className="flex flex-col gap-3.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="Enter your email"
                    className="bg-background border-border"
                    autoComplete="off"
                  />
                  <FieldInfo field={field} />
                </div>
              );
            }}
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link to="/forgot-password" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <form.Field
            name="password"
            children={(field) => {
              return (
                <div className="relative flex flex-col gap-3.5">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type={isVisible ? 'text' : 'password'}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="********"
                    className="bg-background border-border"
                  />
                  <FieldInfo field={field} />
                  <button
                    className="text-muted-foreground/80 cursor-pointer hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                    type="button"
                    onClick={toggleVisibility}
                    aria-label={isVisible ? 'Hide password' : 'Show password'}
                    aria-pressed={isVisible}
                    aria-controls="password"
                  >
                    {isVisible ? <EyeOffIcon size={16} aria-hidden="true" /> : <EyeIcon size={16} aria-hidden="true" />}
                  </button>
                </div>
              );
            }}
          />
        </div>
        <form.Subscribe
          // eslint-disable-next-line style/arrow-parens
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              disabled={!canSubmit}
              className="w-full bg-primary hover:bg-primary/90 cursor-pointer"
            >
              {isSubmitting ? (
                '...'
              ) : (
                <>
                  Sign In
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        />
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <Separator className="w-full" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <SocialIcons />

      <div className="mt-6 text-xs text-muted-foreground w-full ">
        <p className="flex gap-1 justify-center">
          Don't have an account?
          <Link to="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
