import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { NavGroup, type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, ContactRound, Folder, LayoutGrid, Settings2 } from 'lucide-react';
import AppLogo from './app-logo';
import { index as contactsIndex } from '@/routes/contacts';
import { index } from '@/routes/services';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Contacts',
        href: contactsIndex(),
        icon: ContactRound,
    },

    {
        title: 'Services',
        href: index(),
        icon: Settings2,
    },
];

const secondItems: NavGroup[] = [
    // {
    //     title: 'Resources',
    //     items: [
    //         {
    //             title: 'Repository',
    //             href: 'hello',
    //             icon: Folder,
    //         },
    //     ]
    // }
]

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} secondItems={secondItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
