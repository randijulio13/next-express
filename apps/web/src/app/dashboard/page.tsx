import { authGuard } from '@/lib/guards';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardHeader } from './components/dashboard-header';
import { UserTable } from './components/user-table';

export default async function DashboardPage() {
    const session = await authGuard();

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="max-w-5xl mx-auto space-y-8">
                <DashboardHeader userName={session.user.name} />

                <div className="grid gap-6 md:grid-cols-2">
                    <Card className="bg-card border-border shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">Profile Information</CardTitle>
                            <CardDescription>Your account details and status</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-border">
                                <span className="text-muted-foreground">Full Name</span>
                                <span className="font-semibold">{session.user.name}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-border">
                                <span className="text-muted-foreground">Email Address</span>
                                <span className="font-semibold">{session.user.email}</span>
                            </div>
                            <div className="flex justify-between items-center py-2">
                                <span className="text-muted-foreground">Account Status</span>
                                <div className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-bold uppercase tracking-wider">
                                    Active
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-card border-border shadow-md">
                        <CardHeader>
                            <CardTitle className="text-xl">System Status</CardTitle>
                            <CardDescription>Real-time connectivity overview</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center h-full py-6">
                            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                            </div>
                            <p className="font-medium text-lg">Secure Connection Active</p>
                            <p className="text-sm text-muted-foreground">Your session is encrypted and protected</p>
                        </CardContent>
                    </Card>
                </div>

                <UserTable />
            </div>
        </div>
    );
}
