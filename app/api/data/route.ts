import { NextResponse } from 'next/server';

export async function GET(request: Request) {
	const url = new URL(request.url);
	const path = url.pathname;
	const subdomain = url.hostname.split('.')[0];
	//console.log('Route: subdomain', url, subdomain);
	return new Response(JSON.stringify(`Hello from ${subdomain}!`), { status: 200 });
}
