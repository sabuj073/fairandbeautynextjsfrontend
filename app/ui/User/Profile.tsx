
import React from 'react'
import Container from '../Container/Container'
import { cookies } from 'next/headers'
export default function Profile() {
    const cookieStore = cookies();
    const exist = cookieStore.has('auth');
    const cookieData = exist && cookieStore.get('auth')?.value ? JSON.parse(cookieStore.get('auth')!.value) : null;
    return (
        <Container>
            <div>Profile
                {
                    cookieData?.user.name
                }
            </div>
        </Container>
    )
}
