import * as React from 'react';

import { SearchForm } from '@/components/search-form';

import { Sidebar, SidebarContent, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { getNotebooks } from '@/server/notebooks';
import { SidebarData } from '@/components/ui/sidebar-data';
import { Logo } from '@/components/logo';

export const AppSidebar = async ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
    const notebooks = await getNotebooks();
    console.log(notebooks);

    const data = {
        versions: ['1.0.1', '1.1.0-alpha', '2.0.0-beta1'],
        navMain: [
            ...(notebooks.notebooks?.map((notebook) => ({
                title: notebook.name,
                url: `/dashboard/${notebook.id}`,
                items: notebook.notes.map((note) => ({
                    title: note.title,
                    url: `/dashboard/notebook/${notebook.id}/note/${note.id}`,
                })),
            })) ?? []),
        ],
    };

    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <Logo/>

                <React.Suspense>
                    <SearchForm />
                </React.Suspense>
            </SidebarHeader>
            <SidebarContent className='gap-0'>
                <SidebarData data={data} />
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
