import React, { Fragment } from 'react';
import Link from 'next/link';
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Logout } from '@/components/dashboard/logout';
import { ModeToggle } from '@/components/mode-toggle';

interface PageWrapperProps {
    children: React.ReactNode;
    breadcrumbs: {
        label: string;
        href: string;
    }[];
}

const PageWrapper = ({ children, breadcrumbs }: PageWrapperProps) => (
    <div className='flex flex-col gap-4'>
        <header className='flex items-center border-b p-4'>
            <div className='flex w-full items-center justify-between gap-4'>
                <div className='flex items-center gap-4'>
                    <SidebarTrigger />
                    <Breadcrumb>
                        <BreadcrumbList>
                            {breadcrumbs.map((breadcrumb, index) => (
                                <Fragment key={breadcrumb.label}>
                                    <BreadcrumbItem key={breadcrumb.label}>
                                        <BreadcrumbLink asChild>
                                            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                                        </BreadcrumbLink>
                                    </BreadcrumbItem>
                                    {index != breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                                </Fragment>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                <div className='flex items-center gap-4'>
                    <ModeToggle />
                    <Logout />
                </div>
            </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>{children}</div>
    </div>
);

export default PageWrapper;
