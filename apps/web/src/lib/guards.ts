import { redirect } from 'next/navigation';
import { getSession } from '@/actions/auth';

/**
 * Custom auth guard logic that can be used in layouts or pages 
 * as a replacement for middleware redirects.
 */
export async function authGuard() {
    const session = await getSession();

    if (!session.data) {
        redirect('/login');
    }

    return session.data;
}

export async function guestGuard() {
    const session = await getSession();

    if (session.data) {
        redirect('/dashboard');
    }
}
