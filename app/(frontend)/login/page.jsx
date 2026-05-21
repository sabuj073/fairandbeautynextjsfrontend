
import Container from '@/app/ui/Container/Container';
import LoginForm from '@/app/ui/login-form';
export const metadata = {
  title: 'Login | Account',
  description: 'Login | Account',
}
export default function LoginPage() {

  return (
    <main className="pt-10 pb-10">
      <Container>
        <div className="relative mx-auto flex w-full flex-col space-y-2.5 lg:p-4 lg:w-[1000px] ">
          <div className='grid grig-cols-1  w-full ' >
            <LoginForm reg={false} />
          </div>
        </div>
      </Container>
    </main>
  );
}