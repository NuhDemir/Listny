import { useState } from 'react';
import { useAuth } from '@/context';
import { ProfileHeader, EditProfileForm, ChangePasswordForm } from '../components';
import { LoadingScreen, ErrorMessage } from '@/components/shared';

/**
 * ProfilePage - Swiss Style Profile Interface
 * 
 * LAYOUT STRUCTURE:
 * 1. Profile Header (Avatar + Info)
 * 2. Tab Navigation (Profile / Password)
 * 3. Form Content
 * 
 * FEATURES:
 * - Edit profile information
 * - Change password
 * - Upload profile picture
 * - Tab-based navigation
 * 
 * DESIGN:
 * - Follows home/search/library pattern
 * - Mathematical spacing
 * - Minimal, functional UI
 * - Dark/Light mode support
 */

export const ProfilePage = () => {
    const { user, isLoading } = useAuth();
    const [activeTab, setActiveTab] = useState<'profile' | 'password'>('profile');

    // Loading state
    if (isLoading) {
        return <LoadingScreen />;
    }

    // Not authenticated
    if (!user) {
        return (
            <ErrorMessage
                message="You must be logged in to view this page"
                onRetry={() => window.location.href = '/login'}
            />
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="mb-2 text-3xl font-bold tracking-tight">Profile Settings</h1>
                <p className="text-sm text-black/60 dark:text-white/60">
                    Manage your account settings and preferences
                </p>
            </div>

            {/* Profile Header */}
            <ProfileHeader user={user} />

            {/* Tab Navigation */}
            <div className="border-b border-black/10 dark:border-white/10">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('profile')}
                        className={`relative pb-4 text-sm tracking-tight transition-colors ${activeTab === 'profile'
                                ? 'text-black dark:text-white'
                                : 'text-black/40 hover:text-black/60 dark:text-white/40 dark:hover:text-white/60'
                            }`}
                    >
                        Profile Information
                        {activeTab === 'profile' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('password')}
                        className={`relative pb-4 text-sm tracking-tight transition-colors ${activeTab === 'password'
                                ? 'text-black dark:text-white'
                                : 'text-black/40 hover:text-black/60 dark:text-white/40 dark:hover:text-white/60'
                            }`}
                    >
                        Change Password
                        {activeTab === 'password' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black dark:bg-white" />
                        )}
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl">
                {activeTab === 'profile' ? (
                    <div>
                        <h2 className="mb-6 text-xl font-bold tracking-tight">
                            Edit Profile
                        </h2>
                        <EditProfileForm user={user} />
                    </div>
                ) : (
                    <div>
                        <h2 className="mb-6 text-xl font-bold tracking-tight">
                            Change Password
                        </h2>
                        <ChangePasswordForm />
                    </div>
                )}
            </div>
        </div>
    );
};
