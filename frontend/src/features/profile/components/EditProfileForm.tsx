import { useState } from 'react';
import { useUpdateProfile } from '../hooks/useProfile';
import type { User } from '@/types';

/**
 * EditProfileForm - Swiss Style Profile Edit Form
 * 
 * DESIGN:
 * - Minimal form design
 * - Clear labels
 * - Validation
 * - Dark/Light mode support
 */

interface EditProfileFormProps {
    user: User;
    onSuccess?: () => void;
}

export const EditProfileForm = ({ user, onSuccess }: EditProfileFormProps) => {
    const [fullname, setFullname] = useState(user.fullname);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);

    const updateProfile = useUpdateProfile();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await updateProfile.mutateAsync({
                fullname,
                username,
                email,
            });
            onSuccess?.();
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const hasChanges =
        fullname !== user.fullname ||
        username !== user.username ||
        email !== user.email;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
                <label
                    htmlFor="fullname"
                    className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                >
                    Full Name
                </label>
                <input
                    id="fullname"
                    type="text"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    required
                    className="w-full border border-black/10 bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                />
            </div>

            {/* Username */}
            <div>
                <label
                    htmlFor="username"
                    className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                >
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    minLength={3}
                    className="w-full border border-black/10 bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                />
            </div>

            {/* Email */}
            <div>
                <label
                    htmlFor="email"
                    className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-black/10 bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                />
            </div>

            {/* Error Message */}
            {updateProfile.isError && (
                <div className="border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                    Failed to update profile. Please try again.
                </div>
            )}

            {/* Success Message */}
            {updateProfile.isSuccess && (
                <div className="border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                    Profile updated successfully!
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!hasChanges || updateProfile.isPending}
                className="w-full border border-black bg-black py-3 text-sm tracking-tight text-white transition-colors hover:bg-black/80 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
                {updateProfile.isPending ? 'Saving...' : 'Save Changes'}
            </button>
        </form>
    );
};
