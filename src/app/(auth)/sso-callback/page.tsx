import { AuthenticateWithRedirectCallback } from '@clerk/nextjs'
import { Loader2 } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Loader2 className="w-10 h-10 animate-spin text-[var(--blue-secondary))]" />

      <p className="text-sm text-muted-foreground">
        Conectando com sua conta…
      </p>

      <AuthenticateWithRedirectCallback />
    </div>
  );
}
