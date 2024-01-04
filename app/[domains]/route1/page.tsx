import Link from 'next/link';

export default function Page({ params }: { params: { domains: string } }) {
	return (
		<>
			<div>
				<div>Route 1 from server (server component): {params.domains}</div>
				<Link href={'/'}>Home</Link>{' '}
			</div>
		</>
	);
}
