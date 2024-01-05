// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import subdomains from './subdomains.json';
import { auth } from '@/lib/auth';
//import { signIn } from 'next-auth/react';

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.png$).*)'],
};

export async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	const session = await auth();

	console.log('--');
	console.log('session', session?.user);
	console.log('middleware url:', url.toJSON());
	//const hostname = req.headers.get('host');
	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	let hostname = req.headers.get('host');
	console.log('req.headers.get("host")', hostname);
	if (process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
		hostname = req.headers.get('host')!.replace('.localtest.me:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);
	}
	console.log('hostname', hostname);
	// Define los dominios permitidos (localhost y dominio para producción)
	// Define allowed Domains (localhost and production domain)
	const allowedDomains = ['localtest.me', 'localhost', 'e2e-ipgn.com'];

	// Verificamos si el hostname existe en los dominios permitidos
	// Verify if hostname exist in allowed domains
	const isAllowedDomain = allowedDomains.some((domain) => hostname?.includes(domain));

	// Extraemos el posible subdominio en la URL
	// Extract the possible subdomain in the URL
	const subdomain = hostname?.split('.')[0];
	console.log('subdomain', subdomain);

	const searchParams = url.searchParams.toString();
	console.log('searchParams', url.searchParams);

	const subdomainData = subdomains.find((d) => d.subdomain === subdomain);
	console.log('subdomainData', subdomainData);

	//return NextResponse.next();

	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
	console.log('path:', path, url.pathname, searchParams);

	// Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
	// If we stay in a allowed domain and its not a subdomain, allow the request.
	if (isAllowedDomain && (!subdomains.some((d) => d.subdomain === subdomain) || subdomain === 'www')) {
		console.log('isAllowedDomain && !subdomains.some((d) => d.subdomain === subdomain)');
		return NextResponse.next();
	}

	if (!subdomainData) {
		return new Response(null, { status: 404 });
	}
	// rewrite everything else
	const newUrl = new URL(`/${hostname}${path}`, req.url);
	// gives URL that doesn't look right, but local env doesn't work without it - why?
	console.log('newUrl', newUrl.toJSON());
	return NextResponse.rewrite(newUrl);
}
