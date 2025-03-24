import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router';
import { signUpSchema } from '@honora/api/schemas';
import { useForm } from '@tanstack/react-form';

import { signUp } from '../../lib/auth-client';
import { FieldInfo } from '../../components/field-info';

export const Route = createFileRoute('/auth/sign-up')({
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
        alert('User already exists');

        formApi.setFieldValue('email', '');
        formApi.setFieldValue('password', '');
        return;
      }
      router.invalidate();
      await navigate({ to: '/auth/sign-in' });
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
                  onChange={(e) => field.handleChange(e.target.value)}
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
            {isSubmitting ? '...' : 'Signup'}
          </button>
        )}
      />
    </form>
  );
}
