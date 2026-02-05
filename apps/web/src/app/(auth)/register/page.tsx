import { RegisterForm } from './components/register-form';
import { guestGuard } from '@/lib/guards';

export default async function RegisterPage() {
    await guestGuard();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
            <RegisterForm />
        </div>
    );
}
