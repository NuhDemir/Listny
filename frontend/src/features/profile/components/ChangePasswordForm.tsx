import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useChangePassword } from '../hooks/useProfile';

/**
 * ChangePasswordForm - Swiss Style Password Change Form
 * 
 * DESIGN:
 * - Minimal form design
 * - Password visibility toggle
 * - Validation
 * - Dark/Light mode support
 */

export const ChangePasswordForm = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);

    const changePassword = useChangePassword();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            return;
        }

        try {
            await changePassword.mutateAsync({
                currentPassword,
                newPassword,
            });

            // Reset form on success
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Failed to change password:', error);
        }
    };

    const passwordsMatch = newPassword === confirmPassword;
    const isValid = currentPassword && newPassword && confirmPassword && passwordsMatch;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Current Password */}
            <div>
                <label
                    htmlFor="current-password"
                    className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                >
                    Current Password
                </label>
                <div className="relative">
                    <input
                        id="current-password"
                        type={showCurrentPassword ? 'text' : 'password'}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full border border-black/10 bg-white px-4 py-3 pr-12 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white"
                    >
                        {showCurrentPassword ? (
                            <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                        ) : (
                            <Eye className="h-5 w-5" strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </div>

            {/* New Password */}
            <div>
                <label
                    htmlFor="new-password"
                    className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                >
                    New Password
                </label>
                <div className="relative">
                    <input
                        id="new-password"
                        type={showNewPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full border border-black/10 bg-white px-4 py-3 pr-12 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-black/40 hover:text-black dark:text-white/40 dark:hover:text-white"
                    >
                        {showNewPassword ? (
                            <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                        ) : (
                            <Eye className="h-5 w-5" strokeWidth={1.5} />
                        )}
                    </button>
                </div>
            </div>

            {/* Confirm Password */}
            <div>
                <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm tracking-tight text-black/60 dark:text-white/60"
                >
                    Confirm New Password
                </label>
                <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full border border-black/10 bg-white px-4 py-3 text-sm tracking-tight text-black placeholder:text-black/40 focus:border-black focus:outline-none dark:border-white/10 dark:bg-black dark:text-white dark:placeholder:text-white/40 dark:focus:border-white"
                />
                {confirmPassword && !passwordsMatch && (
                    <p className="mt-2 text-xs text-red-600 dark:text-red-400">
                        Passwords do not match
                    </p>
                )}
            </div>

            {/* Error Message */}
            {changePassword.isError && (
                <div className="border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-600 dark:text-red-400">
                    Failed to change password. Please check your current password.
                </div>
            )}

            {/* Success Message */}
            {changePassword.isSuccess && (
                <div className="border border-green-500/20 bg-green-500/10 p-3 text-sm text-green-600 dark:text-green-400">
                    Password changed successfully!
                </div>
            )}

            {/* Submit Button */}
            <button
                type="submit"
                disabled={!isValid || changePassword.isPending}
                className="w-full border border-black bg-black py-3 text-sm tracking-tight text-white transition-colors hover:bg-black/80 disabled:opacity-50 dark:border-white dark:bg-white dark:text-black dark:hover:bg-white/80"
            >
                {changePassword.isPending ? 'Changing...' : 'Change Password'}
            </button>
        </form>
    );
};
