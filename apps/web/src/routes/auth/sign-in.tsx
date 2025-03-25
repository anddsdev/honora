import { signInSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate, useRouter } from '@tanstack/react-router';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Label } from '@/web/components/ui/label';

import { FieldInfo } from '../../components/field-info';
import { signIn } from '../../lib/auth-client';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onChange: signInSchema,
    },
    async onSubmit({ value, formApi }) {
      const response = await signIn.email({
        email: value.email,
        password: value.password,
      });

      if (response.error && response.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
        // TODO: show a message to the user that the email or password is invalid
        formApi.setFieldValue('password', '');
        return;
      }

      router.invalidate();
      await navigate({ to: '/' });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(e);
  };

  const toggleVisibility = () => setIsVisible((prevState: boolean) => !prevState);

  return (
    <>
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
                <div className="relative">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="john@doe.com"
                    className="border-input/50 bg-background/50 backdrop-blur-sm"
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
            <Link to="/forgot-password" className="text-xs text-primary hover:text-orange-600">
              Forgot password?
            </Link>
          </div>
          <form.Field
            name="password"
            children={(field) => {
              return (
                <div className="relative">
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    type={isVisible ? 'text' : 'password'}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="********"
                    className="border-input/50 bg-background/50 backdrop-blur-sm"
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
              className="w-full bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              {isSubmitting ? '...' : 'Sign In'}
            </Button>
          )}
        />
      </form>

      <div className="mt-6 text-xs text-muted-foreground w-full ">
        <p className="flex gap-1 justify-center">
          Don't have an account?
          <Link to="/auth/sign-up" className="text-primary hover:text-orange-600">
            Sign up
          </Link>
        </p>
      </div>
    </>
  );
}
