import { Loader2Icon } from 'lucide-react';

export function Loader() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center ">
      <Loader2Icon className="animate-spin" />
      <p className="mt-2 text-sm text-muted-foreground max-h-screen">Loading...</p>
    </div>
  );
}
