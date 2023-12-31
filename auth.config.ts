import type { NextAuthConfig } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';

export const authConfig = {
	pages: {},
	callbacks: {},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	], // Add providers with an empty array for now
} satisfies NextAuthConfig;
