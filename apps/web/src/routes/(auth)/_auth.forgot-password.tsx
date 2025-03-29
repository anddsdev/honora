/* eslint-disable style/multiline-ternary */
/* eslint-disable style/jsx-one-expression-per-line */
import { forgotPasswordSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { toast } from 'sonner';

import { FieldInfo } from '@/web/components/field-info';
import { Button } from '@/web/components/ui/button';
import { Input } from '@/web/components/ui/input';
import { Label } from '@/web/components/ui/label';
import { forgetPassword } from '@/web/lib/auth-client';

export const Route = createFileRoute('/(auth)/_auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
    },
    validators: {
      onChange: forgotPasswordSchema,
    },
    async onSubmit({ value }) {
      await forgetPassword(
        {
          email: value.email,
        },
        {
          onSuccess: () => {
            toast.success('Password reset email sent');
            navigate({ to: '/sign-in' });
          },
          onError: ({ error }) => {
            toast.error(error.message, {
              duration: 5000,
              action: {
                label: 'Try again',
                onClick: () => {
                  form.setFieldValue('email', '');
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

  return (
    <div className="w-full max-w-md px-8">
      <div className="space-y-4">
        <div className="text-center mb-6">
          <h1 className="text-xl font-semibold text-foreground">Forgot Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we'll send you a link to reset your password
          </p>
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
                    Reset Password
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}
          />
        </form>

        <div className="text-center text-sm text-muted-foreground">
          <Link to="/" className="hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
