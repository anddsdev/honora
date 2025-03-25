import { signUpSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate, useRouter } from '@tanstack/react-router';

import { AuthLayout } from '@/web/components/auth-layout';

import { FieldInfo } from '../../components/field-info';
import { signUp } from '../../lib/auth-client';

export const Route = createFileRoute('/(auth)/_auth/sign-up')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    validators: {
      onChange: signUpSchema,
    },
    async onSubmit({ value, formApi }) {
      const response = await signUp.email({
        name: value.name,
        email: value.email,
        password: value.password,
      });

      if (response.error && response.error.code === 'USER_ALREADY_EXISTS') {
        // TODO: show a message to the user that the email or password is invalid

        formApi.setFieldValue('email', '');
        formApi.setFieldValue('password', '');
        return;
      }
      router.invalidate();
      await navigate({ to: '/auth/sign-in' });
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(e);
  };

  return (
    <AuthLayout>
      <div className="mb-6 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Fill in your details to get started</p>
      </div>
      <form onSubmit={onSubmit}>
        <div>
          <form.Field
            name="name"
            children={(field) => {
              return (
                <>
                  <label htmlFor="name">Name</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="John Doe"
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="email"
            children={(field) => {
              return (
                <>
                  <label htmlFor="email">Pmail</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="john@doe.com"
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <div>
          <form.Field
            name="password"
            children={(field) => {
              return (
                <>
                  <label htmlFor="password">Password</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => field.handleChange(e.target.value)}
                    placeholder="********"
                  />
                  <FieldInfo field={field} />
                </>
              );
            }}
          />
        </div>
        <form.Subscribe
          // eslint-disable-next-line style/arrow-parens
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <button type="submit" disabled={!canSubmit} className="w-full cursor-pointer">
              {isSubmitting ? '...' : 'Signup'}
            </button>
          )}
        />
      </form>

      <div className="mt-6 text-xs text-muted-foreground w-full ">
        <p className="flex gap-1 justify-center">
          Already have an account?
          <Link to="/sign-in" className="text-primary hover:text-orange-600">
            Sign In
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
