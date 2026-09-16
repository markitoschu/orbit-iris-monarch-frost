import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState, type ReactNode } from "react";
import { Toaster } from "sonner";

export function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: { queries: { staleTime: 8_000, retry: 1 } },
      }),
  );

  return (
    <QueryClientProvider client={client}>
      {children}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "font-sans",
          style: {
            background: "var(--color-card)",
            color: "var(--color-foreground)",
            border: "1px solid var(--color-border)",
          },
        }}
      />
    </QueryClientProvider>
  );
}
