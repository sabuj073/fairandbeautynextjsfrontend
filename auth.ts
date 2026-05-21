
import { authConfig } from './auth.config';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { cookies } from 'next/headers';
import { mutateData } from './lib/dataFetching';
import { API_BASE_URL } from './app/config/api';
import axios from 'axios';
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import AppleProvider from "next-auth/providers/apple";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials: any) {
        if (credentials) {
          console.log("credentials",credentials)
          const { email, password, temp_user_id } = credentials;
          const response: any = await axios.post(`${API_BASE_URL}/auth/login`, {
            email: email,
            password: password
          });
          cookies().set('auth', JSON.stringify(response.data), {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 24 * 7, // 1 week
            path: '/',
          });
          if (temp_user_id) {
            await axios.post(`${API_BASE_URL}/carts-update/team_user_update`, {
              user_id: response.data.user.id,
              temp_user_id: temp_user_id
            }, {
              headers: {
                'Content-Type': 'application/json',
              },
            });
          }

          if (response?.data.result) {
            return response.data;
          }
          if (!response.data) return null;
        }
        console.log('Invalid credentials');
        return null
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      async profile(profile) {
        console.log("profile", profile)
        try {
          const response = await mutateData(`${API_BASE_URL}/auth/social-login`, 'POST', {
            email: profile.email,
            name: profile.name,
            image: profile.picture,
            provider: profile.sub,
          }) as any;
          if (response?.result) {
            cookies().set('auth', JSON.stringify(response), {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: '/',
            });
            return response;
          }

          return false;
        } catch (error) {
          console.error('Error during Google signIn:', error);
          return false;
        }

      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      async profile(profile) {
        console.log("profile", profile)
        try {
          const response = await mutateData(`${API_BASE_URL}/auth/social-login`, 'POST', {
            email: profile.email,
            name: profile.name,
            provider: profile.id,
          }) as any;
          if (response?.result) {
            cookies().set('auth', JSON.stringify(response), {
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              maxAge: 60 * 60 * 24 * 7, // 1 week
              path: '/',
            });
            return response;
          }

          return false;
        } catch (error) {
          console.error('Error during Google signIn:', error);
          return false;
        }

      },
    }),
  ],
});