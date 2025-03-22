import { createFileRoute } from '@tanstack/react-router';
import s from '@honora/api-client';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/"!</div>;
}
