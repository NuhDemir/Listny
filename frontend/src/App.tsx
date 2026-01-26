import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from '@/providers';
import { useAuth } from '@/context';
import { MainLayout } from '@/components/layout';
import { LoginPage, RegisterPage } from '@/features/auth/pages';
import { HomePage } from '@/features/home/pages/HomePage';
import { SearchPage } from '@/features/search/pages';
import { LibraryPage, LikedSongsPage } from '@/features/library/pages';
import { ProfilePage } from '@/features/profile/pages';
import { PlaylistDetailPage } from '@/features/playlists/pages/PlaylistDetailPage';
import { AlbumDetailPage } from '@/features/albums/pages';
import { ArtistDetailPage } from '@/features/artists/pages';
import { ProtectedRoute } from '@/features/auth/components';
import { LoadingScreen } from '@/components/shared';

function AppRoutes() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HomePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/search"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SearchPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <MainLayout>
              <LibraryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/liked"
        element={
          <ProtectedRoute>
            <MainLayout>
              <LikedSongsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProfilePage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/playlist/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PlaylistDetailPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/album/:id"
        element={
          <ProtectedRoute>
            <MainLayout>
              <AlbumDetailPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/artist/:artistName"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ArtistDetailPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppRoutes />
      </AppProviders>
    </BrowserRouter>
  );
}

export default App;
