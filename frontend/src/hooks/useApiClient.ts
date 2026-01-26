import { useAuth } from '@clerk/clerk-react';
import { useMemo } from 'react';
import { createApiClient } from '@/lib/api-client';

export const useApiClient = () => {
    const { getToken } = useAuth();

    const client = useMemo(() => {
        return createApiClient({
            getToken: () => getToken(),
        });
    }, [getToken]);

    return client;
};
