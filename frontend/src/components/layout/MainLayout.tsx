import { useState } from 'react';
import type { ReactNode } from 'react';
import { Sidebar } from './Sidebar.tsx';
import { Header } from './Header.tsx';
import { AudioPlayer } from './AudioPlayer.tsx';

interface MainLayoutProps {
    children: ReactNode;
}

/**
 * MainLayout - Swiss Style Grid System
 * 
 * GRID STRUCTURE:
 * - Sidebar: Fixed 240px (15 grid units) - Desktop only
 * - Main: Fluid with responsive padding
 * - Audio Player: Fixed 96px height (6 grid units)
 * 
 * RESPONSIVE:
 * - Mobile: Full width, hamburger menu
 * - Tablet: Full width, hamburger menu
 * - Desktop (1024px+): Sidebar + content
 * 
 * Base Grid Unit: 16px
 */
export const MainLayout = ({ children }: MainLayoutProps) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen overflow-hidden bg-white dark:bg-black">
            {/* Sidebar - Fixed Width Grid Column (Desktop) / Mobile Overlay */}
            <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                setIsMobileMenuOpen={setIsMobileMenuOpen}
            />

            {/* Main Content Area - Fluid Grid */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Header - Fixed Height 64px (4 grid units) */}
                <Header
                    onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    isMobileMenuOpen={isMobileMenuOpen}
                />

                {/* Content - Fluid with Grid Padding */}
                <main className="flex-1 overflow-y-auto px-4 py-6 pb-28 sm:px-6 sm:py-8">
                    <div className="mx-auto max-w-[1440px]">
                        {children}
                    </div>
                </main>

                {/* Audio Player - Fixed Height 96px (6 grid units) */}
                <AudioPlayer />
            </div>
        </div>
    );
};
