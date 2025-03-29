/* eslint-disable antfu/if-newline */
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Label } from '@/web/components/ui/label';
import { resetPassword } from '@/web/lib/auth-client';
import { resetPasswordSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ArrowRight, EyeIcon, EyeOffIcon, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { z } from 'zod';

export const Route = createFileRoute('/(auth)/_auth/reset-password')({
  component: RouteComponent,
});

function PasswordStrengthIndicator({ password }: { password: string }) {
  const [strength, setStrength] = useState(0);

  useEffect(() => {
    let score = 0;
    if (password.length >= 8) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[0-9]/.test(password)) score += 1;
    if (/[^A-Za-z0-9]/.test(password)) score += 1;
    setStrength(score);
  }, [password]);

  return (
    <div className="mt-1">
      <div className="flex gap-1 h-1">
        <div className={`flex-1 rounded-full ${strength >= 1 ? 'bg-red-500' : 'bg-gray-300 bg-opacity-20'}`}></div>
        <div className={`flex-1 rounded-full ${strength >= 2 ? 'bg-yellow-500' : 'bg-gray-300 bg-opacity-20'}`}></div>
        <div className={`flex-1 rounded-full ${strength >= 3 ? 'bg-blue-500' : 'bg-gray-300 bg-opacity-20'}`}></div>
        <div className={`flex-1 rounded-full ${strength >= 4 ? 'bg-green-500' : 'bg-gray-300 bg-opacity-20'}`}></div>
      </div>
      <p className="text-xs text-muted-foreground mt-1">
        {strength === 0 && 'Very weak'}
        {strength === 1 && 'Weak'}
        {strength === 2 && 'Fair'}
        {strength === 3 && 'Good'}
        {strength === 4 && 'Strong'}
      </p>
    </div>
  );
}

function PasswordMatchIndicator({ password, confirmPassword }: { password: string; confirmPassword: string }) {
  const match = password === confirmPassword;

  return (
    <p className={`text-xs mt-1 ${match ? 'text-green-500' : 'text-red-500'}`}>
      {match ? 'Passwords match' : 'Passwords do not match'}
    </p>
  );
}

function RouteComponent() {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const { token } = Route.useSearch();

  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    validators: {
      onChange: resetPasswordSchema,
    },
    async onSubmit({ value }) {
      await resetPassword(
        {
          token,
          newPassword: value.password,
        },
        {
          onSuccess: () => {
            toast.success('Password reset successful');
            navigate({ to: '/sign-in' });
          },
          onError: ({ error }) => {
            toast.error(error.message, {
              duration: 5000,
              action: {
                label: 'Try again',
                onClick: () => {
                  form.setFieldValue('password', '');
                },
              },
            });
          },
        },
      );
    },
  });

  const toggleVisibility = () => setIsVisible((prevState: boolean) => !prevState);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(e);
  };

  return (
    <div className="w-full max-w-md">
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-foreground">Reset Your Password</h1>
          <p className="text-sm text-muted-foreground mt-1">Enter your new password below</p>
        </div>
      </div>

      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <form.Field
            name="password"
            validators={{
              onChange: z
                .string()
                .min(8, 'Password must be at least 8 characters')
                .refine((val) => /[A-Z]/.test(val), 'Must contain uppercase letter')
                .refine((val) => /[0-9]/.test(val), 'Must contain a number'),
            }}
            children={(field) => (
              <div className="space-y-2">
                <Label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                  New Password
                </Label>
                <div className="relative flex flex-col gap-3.5">
                  <Input
                    id={field.name}
                    name={field.name}
                    type={isVisible ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className="bg-background border-border"
                  />
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

                {field.state.value && <PasswordStrengthIndicator password={field.state.value} />}
                {field.state.meta.errors && (
                  <>
                    <p className="text-xs text-red-500 mt-1">
                      {field.state.meta.errors.map((error: any) => {
                        return <li>{error.message}</li>;
                      })}
                    </p>
                  </>
                )}
              </div>
            )}
          />
        </div>
        <form.Field
          name="confirmPassword"
          validators={{
            onChange: ({ value }) => {
              if (value !== form.getFieldValue('password')) {
                return "Passwords don't match";
              }
            },
          }}
          children={(field) => (
            <div className="space-y-2">
              <Label htmlFor={field.name} className="block text-sm font-medium text-foreground">
                Confirm Password
              </Label>
              <Input
                id={field.name}
                name={field.name}
                type={isVisible ? 'text' : 'password'}
                placeholder="••••••••"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
                className="bg-background border-border"
              />
              {field.state.value && (
                <PasswordMatchIndicator password={form.getFieldValue('password')} confirmPassword={field.state.value} />
              )}

              {field.state.meta.errors && (
                <>
                  <p className="text-xs text-red-500 mt-1">
                    {field.state.meta.errors.map((error: any) => {
                      return <li>{error.message}</li>;
                    })}
                  </p>
                </>
              )}
            </div>
          )}
        />
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
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Resetting...
                </>
              ) : (
                <>
                  Reset Password <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
