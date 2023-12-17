"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";

import AuthGuardHoc from "../AuthProvider/AuthGuardHoc";

export default function Providers({ children }) {
  const queryClient = new QueryClient();
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <AuthGuardHoc>{children}</AuthGuardHoc>
      </QueryClientProvider>
    </SessionProvider>
  );
}
