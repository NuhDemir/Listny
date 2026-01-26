import { useState } from 'react';
import { useAuth } from '@/context';
import { getErrorMessage } from '@/utils';

export const useAuthForm = () => {
    const { login, register } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (emailOrUsername: string, password: string) => {
        setIsLoading(true);
        setError(null);

        try {
            await login(emailOrUsername, password);
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (data: {
        username: string;
        email: string;
        password: string;
        fullname: string;
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            await register(data);
        } catch (err) {
            setError(getErrorMessage(err));
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        isLoading,
        error,
        handleLogin,
        handleRegister,
        clearError: () => setError(null),
    };
};
