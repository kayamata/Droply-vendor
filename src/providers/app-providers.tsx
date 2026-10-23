"use client";

import * as React from "react";
import { SessionProvider } from "next-auth/react";
import { ReactQueryProvider } from "@/providers/query-provider";
import { PwaProvider } from "@/providers/pwa-provider";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ReactQueryProvider>
        <PwaProvider>{children}</PwaProvider>
      </ReactQueryProvider>
    </SessionProvider>
  );
}
