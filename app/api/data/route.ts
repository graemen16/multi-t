import 'server-only';
import subdomains from '@/subdomains.json';

export async function GET(request: Request) {
	const url = new URL(request.url);
	//const path = url.pathname;
	let subdomain = url.hostname.split('.')[0];
	let hostname = request.headers.get('host');
	//console.log('Route: subdomain', url, subdomain);
	//console.log('Route: request.headers.get("host")', request.headers.get('host'));
	const headerSubdomain = hostname?.split('.')[0];
	//console.log('Route: headerSubdomain', headerSubdomain, 'subdomain', subdomain);
	if (url.hostname === 'localhost' || url.hostname === 'localtest.me') {
		subdomain = headerSubdomain!;
	}
	const subdomainData = subdomains.find((d) => d.subdomain === subdomain);
	//console.log('Route: subdomainData', subdomainData);
	return new Response(JSON.stringify(`Hello from ${subdomain}!`), { status: 200 });
}
