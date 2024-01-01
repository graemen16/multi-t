import { authConfig } from '@/auth.config';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';

export const {
	handlers: { GET, POST },
	auth,
} = NextAuth(authConfig);
