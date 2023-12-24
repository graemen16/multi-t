'use client';
export default function Page({ params }: { params: { domains: string } }) {
	return <div>Route 2 on client: {params.domains}</div>;
}
