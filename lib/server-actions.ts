'use server';
import { headers } from 'next/headers';

export async function sayHello() {
	// find subdomain
	const heads = headers();
	const pathname = heads.get('next-url');
	const referer = heads.get('referer');

	return 'Hello from server-only! ' + pathname + ', ' + referer;
}
