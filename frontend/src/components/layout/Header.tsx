import { useAuth } from '@/context';
import { Menu, Search, User as UserIcon } from 'lucide-react';
import { useTheme } from '@/context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

/**
 * Header Component - International Typographic Style (Swiss Style)
 * 
 * GRID SYSTEM:
 * - Height: 64px (4 grid units @ 16px base)
 * - Horizontal padding: 24px (1.5 grid units)
 * - Element spacing: 16px (1 grid unit)
 * 
 * TYPOGRAPHY:
 * - Sans-serif only (system fonts)
 * - Extreme contrast: Bold vs Regular
 * - Tracking: Tight (-0.02em to -0.05em)
 * 
 * VISUAL HIERARCHY:
 * - Monochrome: Black/White/Grays only
 * - No shadows, no gradients
 * - Borders: 1px solid, mathematical precision
 * - Transitions: Functional only (200ms)
 * 
 * MODULARITY:
 * - Self-contained component
 * - No external style dependencies
 * - Accessible (ARIA labels, semantic HTML)
 */

interface HeaderProps {
    onMobileMenuToggle?: () => void;
    isMobileMenuOpen?: boolean;
}

export const Header = ({ onMobileMenuToggle }: HeaderProps) => {
    const { user, logout } = useAuth();
    const { theme, setTheme } = useTheme();
    const navigate = useNavigate();
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <header
            className="sticky top-0 z-50 h-16 border-b border-black/10 bg-white dark:border-white/10 dark:bg-black"
            role="banner"
        >
            <div className="flex h-full items-center px-6">
                {/* LEFT SECTION: Mobile Menu - Grid Unit: 40px */}
                <div className="flex items-center lg:hidden">
                    <button
                        type="button"
                        onClick={onMobileMenuToggle}
                        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                        aria-label="Open navigation menu"
                    >
                        <Menu className="h-6 w-6" strokeWidth={1.5} aria-hidden="true" />
                    </button>
                </div>

                {/* CENTER SECTION: Search - Fluid Grid */}
                <div className="mx-auto hidden w-full max-w-xl lg:block">
                    <div className="relative">
                        <Search
                            className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-black/40 dark:text-white/40"
                            strokeWidth={1.5}
                            aria-hidden="true"
                        />
                        <input
                            type="search"
                            placeholder="Search songs, artists, albums"
                            className="h-10 w-full border border-black/10 bg-transparent pl-12 pr-4 text-sm tracking-tight placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:placeholder:text-white/40 dark:focus:border-white"
                            aria-label="Search"
                        />
                    </div>
                </div>

                {/* RIGHT SECTION: Actions - Fixed Grid Units */}
                <div className="ml-auto flex items-center gap-2">
                    {/* Search Button - Mobile Only - Grid Unit: 40px */}
                    <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center transition-colors hover:bg-black/5 lg:hidden dark:hover:bg-white/5"
                        aria-label="Search"
                    >
                        <Search className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                    </button>

                    {/* Theme Toggle - Grid Unit: 40px */}
                    <button
                        type="button"
                        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                        className="flex h-10 w-10 items-center justify-center font-mono text-xl leading-none transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                        aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                    >
                        {theme === 'dark' ? '○' : '●'}
                    </button>

                    {/* User Section - Conditional Render */}
                    {user ? (
                        <div className="relative ml-2 pl-2 border-l border-black/10 dark:border-white/10">
                            {/* User Button - Grid Unit: Variable */}
                            <button
                                type="button"
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                className="flex items-center gap-3 transition-colors hover:bg-black/5 dark:hover:bg-white/5 px-2 py-1.5"
                                aria-expanded={isUserMenuOpen}
                                aria-haspopup="true"
                            >
                                {/* Avatar - Grid Unit: 32px (2 units) */}
                                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-black text-white dark:bg-white dark:text-black">
                                    {user.imageUrl ? (
                                        <img
                                            src={user.imageUrl}
                                            alt=""
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        <UserIcon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
                                    )}
                                </div>

                                {/* User Name - Hidden on Mobile */}
                                <span className="hidden text-sm font-medium tracking-tight md:block">
                                    {user.fullname}
                                </span>

                                {/* Dropdown Indicator */}
                                <svg
                                    className="h-4 w-4 transition-transform"
                                    style={{ transform: isUserMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1.5}
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="square" strokeLinejoin="miter" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {/* Dropdown Menu - Absolute Positioned Grid */}
                            {isUserMenuOpen && (
                                <>
                                    {/* Backdrop */}
                                    <div
                                        className="fixed inset-0 z-40"
                                        onClick={() => setIsUserMenuOpen(false)}
                                        aria-hidden="true"
                                    />

                                    {/* Menu */}
                                    <div
                                        className="absolute right-0 top-full z-50 mt-2 w-56 border border-black/10 bg-white dark:border-white/10 dark:bg-black"
                                        role="menu"
                                        aria-orientation="vertical"
                                    >
                                        {/* User Info Section - Grid Unit: 64px (4 units) */}
                                        <div className="border-b border-black/10 px-4 py-3 dark:border-white/10">
                                            <p className="text-sm font-medium tracking-tight">
                                                {user.fullname}
                                            </p>
                                            <p className="mt-1 text-xs tracking-tight text-black/60 dark:text-white/60">
                                                {user.email}
                                            </p>
                                        </div>

                                        {/* Menu Items */}
                                        <div className="py-2">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigate('/profile');
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="flex w-full items-center px-4 py-2 text-sm tracking-tight transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                                role="menuitem"
                                            >
                                                Profile
                                            </button>

                                            <button
                                                type="button"
                                                onClick={() => {
                                                    navigate('/settings');
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="flex w-full items-center px-4 py-2 text-sm tracking-tight transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                                role="menuitem"
                                            >
                                                Settings
                                            </button>

                                            {user.isAdmin && (
                                                <button
                                                    type="button"
                                                    onClick={() => {
                                                        navigate('/admin');
                                                        setIsUserMenuOpen(false);
                                                    }}
                                                    className="flex w-full items-center px-4 py-2 text-sm tracking-tight transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                                    role="menuitem"
                                                >
                                                    Admin Panel
                                                </button>
                                            )}
                                        </div>

                                        {/* Logout Section */}
                                        <div className="border-t border-black/10 py-2 dark:border-white/10">
                                            <button
                                                type="button"
                                                onClick={() => {
                                                    handleLogout();
                                                    setIsUserMenuOpen(false);
                                                }}
                                                className="flex w-full items-center px-4 py-2 text-sm tracking-tight transition-colors hover:bg-black/5 dark:hover:bg-white/5"
                                                role="menuitem"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    ) : (
                        /* Login Button - Not Authenticated */
                        <button
                            type="button"
                            onClick={() => navigate('/login')}
                            className="ml-2 border border-black px-6 py-2 text-sm font-medium tracking-tight transition-colors hover:bg-black hover:text-white dark:border-white dark:hover:bg-white dark:hover:text-black"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};
