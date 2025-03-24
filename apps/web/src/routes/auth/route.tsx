import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/auth')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-background/80 to-background p-4">
      <div className="w-full max-w-md">
        <Outlet />
      </div>
    </div>
  );
}
