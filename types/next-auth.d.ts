// types/next-auth.d.ts
import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isAdmin?: boolean;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    id?: string;
    isAdmin?: boolean;
  }
}
