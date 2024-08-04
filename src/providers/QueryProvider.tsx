"use client"

import React, { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

export default function QueryProvider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, we usually want to set some default staleTime
        // above 0 to avoid refetching immediately on the client
        staleTime: 10 * 60 * 1000,
        gcTime: 60 * 100 * 1000,
        refetchOnReconnect: true,
        retry: false
      },
    },
  }));
  return (
    <div>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </div>
  );
}
