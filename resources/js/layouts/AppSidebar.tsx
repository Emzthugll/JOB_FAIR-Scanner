import { useSidebar } from '@/context/SidebarContext';
import { Bomb, ScanQrCode } from 'lucide-react';

type NavItem = {
    name: string;
    icon: React.ReactNode;
    path?: string;
    subItems?: { name: string; path?: string }[];
};

const navItems: NavItem[] = [
    { icon: <ScanQrCode />, name: 'Scanner', path: '/' },
    { icon: <Bomb />, name: 'Table', path: '/table' },
];

const AppSidebar: React.FC = () => {
    const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();

    return (
        <aside
            className={`fixed top-0 left-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out lg:mt-0 ${
                isExpanded || isMobileOpen ? 'w-[290px]' : isHovered ? 'w-[290px]' : 'w-[90px]'
            } ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <div className={`flex py-8 ${!isExpanded && !isHovered ? 'lg:justify-center' : 'justify-start'}`}>
                {isExpanded || isHovered || isMobileOpen ? (
                    <>
                        <img className="dark:hidden" src="/images/work.png" alt="Logo" width={150} height={40} />
                        <img className="hidden dark:block" src="/images/work.png" alt="Logo" width={150} height={40} />
                    </>
                ) : (
                    <img src="/images/work.png" alt="Logo" width={32} height={32} />
                )}
            </div>

            {/* Menu Items */}
            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                <nav className="mb-6">
                    <ul className="flex flex-col gap-4">
                        {navItems.map((nav) => (
                            <li key={nav.name} className="menu-item group menu-item-inactive cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <span className="menu-item-icon-size">{nav.icon}</span>
                                    {(isExpanded || isHovered || isMobileOpen) && <span className="menu-item-text">{nav.name}</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default AppSidebar;
