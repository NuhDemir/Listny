import { useLocation, useNavigate } from 'react-router-dom';
import { Home, Search, Library, PlusCircle, Heart, X } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Sidebar - Swiss Style Navigation
 * 
 * GRID SYSTEM:
 * - Desktop: 240px width (15 units × 16px)
 * - Mobile: Full width overlay
 * - Height units: 16px base (1 unit)
 * 
 * TYPOGRAPHY:
 * - Logo: 24px bold, -0.05em tracking (Extreme contrast)
 * - Nav items: 14px medium, -0.025em tracking
 * - Footer: 12px regular, -0.025em tracking
 * 
 * LAYOUT:
 * - Mathematical precision: All spacing in 8px increments
 * - Vertical rhythm: Consistent 8px baseline grid
 * - Negative space: Generous padding for breathing room
 * 
 * RESPONSIVE:
 * - Mobile: Hamburger menu → Full-screen overlay
 * - Tablet: Hidden, use mobile menu
 * - Desktop (1024px+): Fixed sidebar
 */

interface NavItem {
    name: string;
    href: string;
    icon: typeof Home;
    badge?: number;
}

interface SidebarProps {
    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: (open: boolean) => void;
}

const primaryNav: NavItem[] = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Search', href: '/search', icon: Search },
    { name: 'Library', href: '/library', icon: Library },
];

const secondaryNav: NavItem[] = [
    { name: 'Create Playlist', href: '/playlist/new', icon: PlusCircle },
    { name: 'Liked Songs', href: '/liked', icon: Heart },
];

export const Sidebar = ({ isMobileMenuOpen, setIsMobileMenuOpen }: SidebarProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const isActive = (href: string) => {
        if (href === '/') return location.pathname === '/';
        return location.pathname.startsWith(href);
    };

    const handleNavigation = (href: string) => {
        navigate(href);
        setIsMobileMenuOpen(false);
    };

    const NavContent = () => (
        <>
            {/* Logo - Grid Unit: 64px (4 units) */}
            <div className="flex h-16 items-center justify-between border-b border-black/10 px-6 dark:border-white/10">
                <h1 className="text-2xl font-bold tracking-tighter">
                    MUSIC
                </h1>
                {/* Close button - Mobile only */}
                <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex h-8 w-8 items-center justify-center lg:hidden"
                    aria-label="Close menu"
                >
                    <X className="h-5 w-5" strokeWidth={1.5} />
                </button>
            </div>

            {/* Navigation - Fluid Grid */}
            <nav className="flex-1 overflow-y-auto px-3 py-6">
                {/* Primary Navigation */}
                <div className="space-y-1">
                    {primaryNav.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.href)}
                                className={cn(
                                    'group flex w-full items-center gap-3 px-3 py-3 text-sm font-medium tracking-tight transition-colors',
                                    active
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                                )}
                            >
                                <item.icon
                                    className="h-5 w-5 flex-shrink-0"
                                    strokeWidth={active ? 2 : 1.5}
                                />
                                <span className="truncate">{item.name}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Divider - Grid Unit: 32px (2 units) */}
                <div className="my-6 h-px bg-black/10 dark:bg-white/10" />

                {/* Secondary Navigation */}
                <div className="space-y-1">
                    {secondaryNav.map((item) => {
                        const active = isActive(item.href);
                        return (
                            <button
                                key={item.name}
                                onClick={() => handleNavigation(item.href)}
                                className={cn(
                                    'group flex w-full items-center gap-3 px-3 py-3 text-sm font-medium tracking-tight transition-colors',
                                    active
                                        ? 'bg-black text-white dark:bg-white dark:text-black'
                                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                                )}
                            >
                                <item.icon
                                    className="h-5 w-5 flex-shrink-0"
                                    strokeWidth={active ? 2 : 1.5}
                                />
                                <span className="truncate">{item.name}</span>
                            </button>
                        );
                    })}
                </div>
            </nav>

            {/* Footer Info - Grid Unit: 48px (3 units) */}
            <div className="border-t border-black/10 px-6 py-4 dark:border-white/10">
                <p className="text-xs tracking-tight text-black/60 dark:text-white/60">
                    © 2026 Music App
                </p>
            </div>
        </>
    );

    return (
        <>
            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-40 bg-black/50 lg:hidden dark:bg-black/70"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Mobile Sidebar */}
                    <aside className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-black/10 bg-white lg:hidden dark:border-white/10 dark:bg-black">
                        <NavContent />
                    </aside>
                </>
            )}

            {/* Desktop Sidebar - Hidden on mobile/tablet */}
            <aside className="hidden lg:flex lg:w-60 lg:flex-col border-r border-black/10 bg-white dark:border-white/10 dark:bg-black">
                <NavContent />
            </aside>
        </>
    );
};
