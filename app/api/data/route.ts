import 'server-only';
import subdomains from '@/subdomains.json';

export async function GET(request: Request) {
	const url = new URL(request.url);
	let subdomain = url.hostname.split('.')[0];
	// above is OK for prod, but for local dev we need to get the subdomain from the header
	let hostname = request.headers.get('host');
	if (url.hostname === 'localhost' || url.hostname === 'localtest.me') {
		subdomain = hostname?.split('.')[0]!;
	}
	const subdomainData = subdomains.find((d) => d.subdomain === subdomain);

	if (!subdomainData) {
		// no valid subdomain do something?
	}
	return new Response(JSON.stringify(`Hello from ${subdomain}!`), { status: 200 });
}
