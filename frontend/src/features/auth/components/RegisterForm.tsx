import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuthForm } from '../hooks/useAuthForm';
import { LoadingSpinner } from '@/components/shared';
import { cn } from '@/lib/utils';
import { isValidEmail } from '@/utils';

export const RegisterForm = () => {
    const navigate = useNavigate();
    const { handleRegister, isLoading, error } = useAuthForm();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        fullname: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [validationError, setValidationError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
        setValidationError('');
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setValidationError('');

        // Validation
        if (formData.username.length < 3) {
            setValidationError('Kullanıcı adı en az 3 karakter olmalıdır');
            return;
        }

        if (!isValidEmail(formData.email)) {
            setValidationError('Geçerli bir email adresi giriniz');
            return;
        }

        if (formData.password.length < 6) {
            setValidationError('Şifre en az 6 karakter olmalıdır');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setValidationError('Şifreler eşleşmiyor');
            return;
        }

        if (formData.fullname.length < 2) {
            setValidationError('Ad soyad en az 2 karakter olmalıdır');
            return;
        }

        try {
            await handleRegister({
                username: formData.username,
                email: formData.email,
                password: formData.password,
                fullname: formData.fullname,
            });
            navigate('/');
        } catch (err) {
            // Error is handled by useAuthForm
        }
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4">
            <div>
                <label htmlFor="fullname" className="block text-sm font-medium mb-2">
                    Ad Soyad
                </label>
                <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    value={formData.fullname}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Ahmet Yılmaz"
                />
            </div>

            <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                    Kullanıcı Adı
                </label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength={3}
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="kullaniciadi"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                </label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="email@example.com"
                />
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                    Şifre
                </label>
                <div className="relative">
                    <input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        value={formData.password}
                        onChange={handleChange}
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

            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                    Şifre Tekrar
                </label>
                <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    minLength={6}
                    className="w-full px-4 py-2 rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="••••••••"
                />
            </div>

            {(error || validationError) && (
                <div className="p-3 rounded-md bg-destructive/10 text-destructive text-sm">
                    {error || validationError}
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
                        <UserPlus className="h-5 w-5" />
                        Kayıt Ol
                    </>
                )}
            </button>

            <div className="text-center text-sm">
                <span className="text-muted-foreground">Zaten hesabınız var mı? </span>
                <button
                    type="button"
                    onClick={() => navigate('/login')}
                    className="text-primary hover:underline"
                >
                    Giriş Yap
                </button>
            </div>
        </form>
    );
};
