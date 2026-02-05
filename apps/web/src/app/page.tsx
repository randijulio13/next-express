import { redirect } from 'next/navigation';
import { getSession } from '@/actions/auth';

export default async function Home() {
  const session = await getSession();

  if (session.data) {
    redirect('/dashboard');
  } else {
    redirect('/login');
  }
}
