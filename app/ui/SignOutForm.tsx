

"use client"
import { PowerIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { logOut } from '../lib/actions';
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

export default function SignOutForm({ sign_out }: any) {


  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams()

  const handleSignOut = async () => {
    let callbackUrl
    let getCall = params.get('callbackUrl')
    if (getCall) {
      callbackUrl = encodeURIComponent(getCall)
    } else {
      callbackUrl = encodeURIComponent(pathname);
    }

    console.log("callbackUrl", callbackUrl)

    await logOut();
    await signOut({ redirect: false });
    router.push(`/login?callbackUrl=${callbackUrl}`);
  };

  return (
    <form
      action={handleSignOut}
    >
      <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
        <PowerIcon className="w-6" />
        <div className="hidden md:block">{sign_out}</div>
      </button>
    </form>
  );
}
