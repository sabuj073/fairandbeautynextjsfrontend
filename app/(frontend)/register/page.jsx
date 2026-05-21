
import LoginForm from '@/app/ui/login-form';
import Container from '@/app/ui/Container/Container';
import { auth } from '@/auth';
import { API_BASE_URL } from '@/app/config/api';
export const metadata = {
  title: 'Register | Account',
  description: 'Register | Account',
}
async function getReferralValidClick(id,referral_code){
  const response = await fetch(`${API_BASE_URL}/affiliate_click?id=${id}&referral_code=${referral_code}`, {
    cache: 'no-store',
  });
  if (!response.ok) {
    return [];
  }
  const data = await response.json();
  return data ;
}


export default async function LoginPage({searchParams}) {
  const referral_code = searchParams?.referral_code || '';
  const token = await auth()
  if(referral_code){
    const result = await getReferralValidClick(token?.user?.id,referral_code);
  }

 
  return (
    <main className="pt-10 pb-10">
      <Container>
        <div className="relative mx-auto flex w-full flex-col space-y-2.5 lg:p-4 lg:w-[1000px] ">
          <div className='grid grig-cols-1  w-full ' >
            <LoginForm reg={true} />
          </div>
        </div>
      </Container>
    </main>
  );
}