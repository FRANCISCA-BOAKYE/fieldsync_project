import React from 'react';
import Sidebar from '@/components/Sidebar';

interface AppLayoutProps {
  children: React.ReactNode;
  role?: 'Admin' | 'Technician' | 'Client';
  userName?: string;
  userEmail?: string;
}

export default function AppLayout({ children, role = 'Admin', userName, userEmail }: AppLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ backgroundColor: 'var(--background)' }}>
      <Sidebar role={role} userName={userName} userEmail={userEmail} />
      <main className="flex-1 overflow-y-auto scrollbar-thin">
        {children}
      </main>
    </div>
  );
}