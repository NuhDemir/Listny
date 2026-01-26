import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import { LoadingSpinner } from '@/components/shared';
import { cn } from '@/lib/utils';

export const LoginForm = () => {
    const navigate = useNavigate();
    const { handleLogin, isLoading, error } = useAuthForm();
    const [emailOrUsername, setEmailOrUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await handleLogin(emailOrUsername, password);
            navigate('/');
        } catch (err) {
            // Error is handled by useAuthForm
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-6">
            <div>
                <label htmlFor="emailOrUsername" className="block text-sm font-medium mb-2">
                    Email veya Kullanıcı Adı
                </label>
                <input
                    id="emailOrUsername"
                    type="text"
                    value={emailOrUsername}
                    onChange={(e) => setEmailOrUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@example.com veya kullaniciadi"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Şifre
                </label>
                <div className="relative">
                    <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                        className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="••••••••"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                </div>
            </div>

            {error && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={isLoading}
                className={cn(
                    'w-full flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-primary text-primary-foreground font-medium',
                    'hover:bg-primary/90 transition-colors',
                    'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
            >
                {isLoading ? (
                    <LoadingSpinner size="sm" />
                ) : (
                    <>
                        <LogIn className="h-5 w-5" />
                        Giriş Yap
                    </>
                )}
            </button>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">Hesabınız yok mu? </span>
                <button
                    type="button"
                    onClick={() => navigate('/register')}
                    className="text-primary hover:underline"
                >
                    Kayıt Ol
                </button>
            </div>
        </form>
    );
};
