import { useSidebar } from '@/context/SidebarContext';
import { Link } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

const AppHeader: React.FC = () => {
    const [isApplicationMenuOpen, setApplicationMenuOpen] = useState(false);
    const { isMobileOpen, isExpanded, toggleSidebar, toggleMobileSidebar } = useSidebar();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleToggle = () => {
        if (window.innerWidth >= 1050) {
            toggleSidebar();
        } else {
            toggleMobileSidebar();
        }
    };

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
                event.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <header className="sticky top-0 z-50 flex h-16 w-full items-center bg-[#084896] px-2 lg:px-6">
            <div className="flex w-full items-center justify-between lg:justify-start">
                {/* Sidebar toggle button */}
                <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#084896] lg:hidden"
                    onClick={handleToggle}
                    aria-label="Toggle Sidebar"
                >
                    {isMobileOpen ? <span className="text-xl font-bold text-white">×</span> : <span className="text-xl font-bold text-white">≡</span>}
                </button>

                {/* Logo */}
                {!isExpanded && !isMobileOpen && (
                    <div className="absolute left-1/2 -translate-x-1/2 transform lg:static lg:ml-4 lg:translate-x-0">
                        <Link href="/">
                            <img className="h-8 dark:hidden" src="/images/workin.webp" alt="Logo" />
                            <img className="hidden h-8 dark:block" src="/images/workin.webp" alt="Logo" />
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
};

export default AppHeader;
