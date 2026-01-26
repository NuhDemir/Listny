import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context';
import { LoadingScreen } from '@/components/shared';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false }: ProtectedRouteProps) => {
    const { isAuthenticated, isLoading, user } = useAuth();

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (requireAdmin && !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};
