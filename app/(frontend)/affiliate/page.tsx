
import Container from '@/app/ui/Container/Container';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import AffiliateForm from '@/app/ui/AffiliateForm/AffiliateForm';
export const metadata: Metadata = {
  title: 'Affiliate | Account',
  description: 'Affiliate | Account',
}
export default function LoginPage() {
  const cookieStore = cookies();
  const exist = cookieStore.has('auth');
  const cookieData = exist && cookieStore.get('auth')?.value ? JSON.parse(cookieStore.get('auth')!.value) : null;

  return (
    <main className="pt-10 pb-10">
      <Container>
        <div className="relative mx-auto flex w-full flex-col space-y-2.5 lg:p-4 lg:w-[1000px] ">
          <div className='grid grig-cols-1  w-full ' >
            <AffiliateForm />
          </div>
        </div>
      </Container>
    </main>
  );
}