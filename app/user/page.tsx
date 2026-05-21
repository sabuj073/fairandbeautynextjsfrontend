
import { Metadata } from 'next'
import Profile from '../ui/User/Profile'
import { cookies } from 'next/headers'
export const metadata: Metadata = {
    title: 'Profile',
    description: 'Profile',
}
export default function Page() {
    const cookieStore = cookies()
    const exist = cookieStore.has('auth');
    const cookieData = exist && cookieStore.get('auth')?.value ? JSON.parse(cookieStore.get('auth')!.value) : null;
    return (
        <div>

            <Profile />
        </div>
    )
}
