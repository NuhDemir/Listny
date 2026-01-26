import { Music } from 'lucide-react';
import { RegisterForm } from '../components/RegisterForm';

export const RegisterPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-accent p-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground mb-4">
                        <Music className="h-8 w-8" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Hesap Oluştur</h1>
                    <p className="text-muted-foreground">Müzik yolculuğunuza başlayın</p>
                </div>

                <div className="bg-card rounded-lg shadow-lg p-8">
                    <RegisterForm />
                </div>
            </div>
        </div>
    );
};
