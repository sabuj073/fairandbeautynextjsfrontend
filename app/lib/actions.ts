'use server';
import { z } from 'zod';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { cookies } from 'next/headers';
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});


export async function authenticateSignUp(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    console.log(formData)
    // await signIn('credentials', formData);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn('credentials', formData);

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logOut() {
  try {
    const cookieStore = cookies();
    cookieStore.set('auth', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: -1, // 
      path: '/',
    });

  } catch (error) {
    return null
  }
}

export async function setProductCookie() {
  const cookieStore = cookies();
  cookieStore.set('name', 'lee');
}


export async function setProductIdCookie(productId: string) {
  const cookieStore = cookies();

  cookieStore.set('productId', productId, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Ensure secure in production
  });
}


export async function RecentView(productId: any) {
  try {
    const cookieStore = cookies();
    const recentDataCookie = cookieStore.get('recentData')?.value;
    let recentData: number[] = [];

    if (recentDataCookie) {
      recentData = JSON.parse(recentDataCookie);
    }

    // Only add the productId if it's not already in the recentData array
    if (productId && !recentData.includes(productId)) {
      recentData.push(productId);
    }

    console.log("recentData", recentData);

    // Set the updated recentData back to the cookie
    cookies().set('recentData', JSON.stringify(recentData), { secure: true })
    // cookieStore.set('recentData', JSON.stringify(recentData), {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 60 * 60 * 24 * 7, // 1 week
    //   path: '/',
    // });
    // setCookie('recentData', JSON.stringify(recentData), options);

    const ddd = cookieStore.get('recentData')?.value;
    console.log("ddd", ddd)


  } catch (error) {
    console.error("Error setting recentData cookie:", error);
    return null;
  }
}
export async function setSetting(setting: any) {
  try {
    const cookieStore = cookies();
    cookieStore.set('settingData', JSON.parse(setting), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    });

  } catch (error) {
    return null
  }
}


export async function checkoutAction() {
  try {
    return true

  } catch (error) {
    return null
  }
}
