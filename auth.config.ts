import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    error: '/login', // Optional: redirect to login on auth error
  },
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async jwt({ user, trigger, session, token }: any) {
      if (user) {
        token.user = {
          id: user?.user?.id,
          name: user?.user?.name,
          email: user?.user?.email,
          type: user?.user?.type,
          avatar: user?.user?.avatar,
          phone: user?.user?.phone,
          accessToken: user.access_token,
          result: user.result,
          message: user.message,
        };
      }

      if (trigger === 'update' && session) {
        token.user = {
          ...token.user,
          email: session.user.email || null,
          name: session.user.name || null,
          phone: session.user.phone || null,
          lang: session.user.lang || 'en',
          translate: session.translate || null,
        };
      } else {
        token.lang = 'en';
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.user?.result) {
        session.user = token.user;
      } else {
        session.user = null;
        session.message = token.user?.message || 'Session invalid';
      }
      return session;
    },

    // ✅ This is critical for proper redirect after login/signup
    async redirect({ url, baseUrl }) {
      // If no specific redirect is set, always go to dashboard
      return `${baseUrl}/user/dashboard`;
    },
  },
  providers: [], // Keep empty if you're not using Google/Facebook/etc.
  trustHost: true,
} satisfies NextAuthConfig;
