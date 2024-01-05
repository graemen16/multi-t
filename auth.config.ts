import type { NextAuthConfig, User } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import CredentialsProvider from 'next-auth/providers/credentials';
const useSecureCookies = true; //process.env.NEXTAUTH_URL!.startsWith('https://');
export const authConfig = {
	pages: {},
	callbacks: {
		authorized({ auth, request: { nextUrl } }) {
			const isLoggedIn = !!auth?.user;
			return isLoggedIn;
			const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
			if (isOnDashboard) {
				if (isLoggedIn) return true;
				return false; // Redirect unauthenticated users to login page
			} else if (isLoggedIn) {
				return Response.redirect(new URL('/dashboard', nextUrl));
			}
			return true;
		},
		async redirect({ url, baseUrl }) {
			// Allows relative callback URLs
			console.log('url, baseUrl', url, baseUrl);

			if (url.startsWith('/')) return `${baseUrl}${url}`;
			// Allows callback URLs on the same origin
			else if (new URL(url).origin === baseUrl) return url;

			return url; // was return baseUrl
		},
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),

		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Testing',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				console.log('credentials', credentials);
				async function checkUser(credentials: any): Promise<User | null> {
					if (
						process.env.NODE_ENV === 'development' &&
						credentials?.username === 'gv' &&
						credentials?.password === 'gv'
					) {
						const user: User = { id: '1', name: 'J Smith', email: 'js@gv.com' };
						return user;
					}
					if (
						process.env.NODE_ENV === 'development' &&
						credentials?.username === 'gn' &&
						credentials?.password === '123'
					) {
						const user: User = {
							id: 'a',
							name: 'Graeme N Test',
							email: 'graemen16@gmail.com',
						};
						return user;
					}
					return null;
				}
				const user = await checkUser(credentials);

				// Return null if user data could not be retrieved
				return user;
			},
		}),
	], // Add providers with an empty array for now
	/*
	cookies: {
		sessionToken: {
			name: `${useSecureCookies ? '__Secure-' : ''}next-auth.session-token`,
			options: {
				httpOnly: true,
				sameSite: 'lax',
				path: '/',
				domain: hostName == 'localhost' ? hostName : '.' + rootDomain, // add a . in front so that subdomains are included //'.localtest.me',
				secure: useSecureCookies,
			},
		},
	},
	*/
} satisfies NextAuthConfig;
