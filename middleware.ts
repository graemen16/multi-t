// middleware.js
import { NextRequest, NextResponse } from 'next/server';
import subdomains from './subdomains.json';

import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import { auth } from './lib/auth';

//export default NextAuth(authConfig).auth;

export const config = {
	// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
/*
export const config = {
	matcher: ['/((?!api/|_next/|_static/|_vercel|[\\w-]+\\.\\w+).*)'],
};
*/
//export default NextAuth(authConfig).auth;

export async function middleware(req: NextRequest) {
	const url = req.nextUrl;
	//const hostname = req.headers.get('host');
	// Get hostname of request (e.g. demo.vercel.pub, demo.localhost:3000)
	let hostname = req.headers.get('host')!.replace('.localhost:3000', `.${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`);

	// Define los dominios permitidos (localhost y dominio para producción)
	// Define allowed Domains (localhost and production domain)
	const allowedDomains = ['localhost:3000', 'multi-t.vercel.app'];

	// Verificamos si el hostname existe en los dominios permitidos
	// Verify if hostname exist in allowed domains
	const isAllowedDomain = allowedDomains.some((domain) => hostname?.includes(domain));

	// Extraemos el posible subdominio en la URL
	// Extract the possible subdomain in the URL
	const subdomain = hostname?.split('.')[0];

	// Si estamos en un dominio habilitado y no es un subdominio, permitimos la solicitud.
	// If we stay in a allowed domain and its not a subdomain, allow the request.
	if (isAllowedDomain && (!subdomains.some((d) => d.subdomain === subdomain) || subdomain === 'www')) {
		console.log('isAllowedDomain && !subdomains.some((d) => d.subdomain === subdomain)');
		return NextResponse.next();
	}

	const subdomainData = subdomains.find((d) => d.subdomain === subdomain);
	console.log('subdomainData', subdomainData);

	//return NextResponse.next();
	/*
	//if (subdomainData) {
	// Rewrite the URL in the dynamic route based in the subdomain
	// Reescribe la URL a una ruta dinámica basada en el subdominio
	return NextResponse.rewrite(new URL(`/${subdomain}${url.pathname}`, req.url));
	//}

	return new Response(null, { status: 404 });
	*/

	if (!subdomainData) {
		return new Response(null, { status: 404 });
	}

	const searchParams = req.nextUrl.searchParams.toString();
	// Get the pathname of the request (e.g. /, /about, /blog/first-post)
	const path = `${url.pathname}${searchParams.length > 0 ? `?${searchParams}` : ''}`;
	// rewrite root application to `/home` folder
	if (hostname === 'localhost:3000' || hostname === process.env.NEXT_PUBLIC_ROOT_DOMAIN) {
		return NextResponse.rewrite(new URL(`/home${path === '/' ? '' : path}`, req.url));
	}

	// rewrite everything else to `/[domain]/[slug] dynamic route
	return NextResponse.rewrite(new URL(`/${hostname}${path}`, req.url));
}
