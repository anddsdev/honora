import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { signInSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';

import { signIn } from '../../lib/auth-client';
import { FieldInfo } from '../../components/field-info';

export const Route = createFileRoute('/auth/sign-in')({
  component: RouteComponent,
});

function RouteComponent() {
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
      console.log(response);
      if (response.error && response.error.code === 'INVALID_EMAIL_OR_PASSWORD') {
        alert('Invalid email or password');

        formApi.setFieldValue('password', '');
        return;
      }

      router.invalidate();
      await navigate({ to: '/' });
      return;
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit(e);
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <form.Field
          name="email"
          children={(field) => {
            return (
              <>
                <label htmlFor="email">Email</label>
                <input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
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
                  type="password"
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="********"
                />
                <FieldInfo field={field} />
              </>
            );
          }}
        />
      </div>
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => (
          <button type="submit" disabled={!canSubmit} className="w-full cursor-pointer">
            {isSubmitting ? '...' : 'Sign In'}
          </button>
        )}
      />
    </form>
  );
}
