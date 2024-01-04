'use server';
import { headers } from 'next/headers';
import subdomains from '@/subdomains.json';

export async function sayHello() {
	// find subdomain
	const heads = headers();
	//const pathname = heads.get('next-url');
	//const referer = heads.get('referer');
	const hostname = heads.get('host');
	const subdomain = hostname!.split('.')[0];
	const subdomainData = subdomains.find((d) => d.subdomain === subdomain);
	const subdomainJson = JSON.stringify(subdomainData);

	return 'Hello from server-only! ' + subdomainJson;
}
