import { SidebarProvider } from '@/components/ui/sidebar';
import React from 'react';
import { AppSidebar } from '@/components/app-sidebar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => (
    <SidebarProvider>
        <AppSidebar />
        <main className='flex-1'>{children}</main>
    </SidebarProvider>
);

export default DashboardLayout;
