import { useSidebar } from '@/context/SidebarContext';
import { Link, usePage } from '@inertiajs/react';
import { ChartSpline, Folder, ScanQrCode } from 'lucide-react';

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path?: string }[];
};

const navItems: NavItem[] = [
    { icon: <ScanQrCode />, name: 'Scanner', path: '/scanner' }, // updated
    { icon: <ChartSpline />, name: 'Statistics', path: '/statistics' },
    { icon: <Folder />, name: 'Reports', path: '/reports' },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
    const { url } = usePage();
    const pathname = new URL(url, window.location.origin).pathname;

    return (
        <aside
            className={`fixed top-0 left-0 z-50 flex h-full flex-col bg-[#084896] px-5 text-gray-900 transition-transform duration-300 ease-in-out ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:transition-[width] lg:duration-300 lg:ease-in-out ${isExpanded || isHovered ? 'lg:w-[290px]' : 'lg:w-[90px]'} mt-16 lg:mt-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <div
                className={`flex items-center py-8 ${
                    isMobileOpen ? 'justify-center' : !isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'
                }`}
            >
                <Link href="/reports">
                    {isExpanded || isHovered || isMobileOpen ? (
                        <>
                            <img className="dark:hidden" src="/images/workin.webp" alt="Logo" width={150} height={40} />
                            <img className="hidden dark:block" src="/images/workin.webp" alt="Logo" width={150} height={40} />
                        </>
                    ) : (
                        <img src="/images/workin.webp" alt="Logo" width={32} height={32} />
                    )}
                </Link>
            </div>

            {/* Menu Items */}
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mb-6">
                    <ul className="flex flex-col gap-2">
                        {navItems.map((nav) => {
                            const isActive = pathname.startsWith(nav.path || '');

                            return (
                                <li key={nav.name}>
                                    <Link
                                        href={nav.path || '#'}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                                            isActive ? 'bg-white text-[#084896]' : 'text-gray-200 hover:bg-gray-200/20 hover:text-white'
                                        }`}
                                    >
                                        <span className="menu-item-icon-size">{nav.icon}</span>
                                        {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
