'use client';

import { Button } from '@/components/ui/button';
import { logout } from '@/actions/auth';
import { useRouter } from 'next/navigation';

interface DashboardHeaderProps {
    userName: string;
}

export function DashboardHeader({ userName }: DashboardHeaderProps) {
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.push('/login');
        router.refresh();
    };

    return (
        <header className="flex justify-between items-center bg-card p-6 rounded-lg border border-border shadow-sm">
            <div>
                <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, {userName}</p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="border-primary text-primary hover:bg-primary/10">
                Logout
            </Button>
        </header>
    );
}
