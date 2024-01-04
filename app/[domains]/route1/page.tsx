import { sayHello } from '@/lib/server-actions';
import Link from 'next/link';

export default async function Page({ params }: { params: { domains: string } }) {
	const data = await sayHello();
	return (
		<>
			<div>
				<div>Route 1 from server (server component): {params.domains}</div>
				<div>Data: {data}</div>
				<Link href={'/'}>Home</Link>{' '}
			</div>
		</>
	);
}
