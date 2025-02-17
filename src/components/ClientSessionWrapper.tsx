// app/components/ClientSessionWrapper.tsx
'use client'; // This ensures it's a client component

import { SessionProvider } from 'next-auth/react'; 
import { ReactNode } from 'react';

export default function ClientSessionWrapper({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
