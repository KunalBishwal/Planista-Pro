// app/layout.tsx
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ClientSessionWrapper from '@/components/ClientSessionWrapper'; // Import the ClientSessionWrapper
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Planista-Pro',
  description: 'Your ultimate event management solution',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#FFE6E2]">
        {/* Wrap the client-side part with ClientSessionWrapper */}
        <ClientSessionWrapper>
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientSessionWrapper>
      </body>
    </html>
  );
}
