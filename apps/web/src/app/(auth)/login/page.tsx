import { LoginForm } from './components/login-form';
import { guestGuard } from '@/lib/guards';

export default async function LoginPage() {
    await guestGuard();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <LoginForm />
        </div>
    );
}
