import { auth } from '@/lib/auth';
import { sayHello } from '@/lib/server-actions';
import Link from 'next/link';

export default async function Page({ params }: { params: { domains: string } }) {
	const data = await sayHello();
	const session = await auth();
	return (
		<>
			<div>
				<div>E2E Route 1 from server (server component): {params.domains}</div>
				<div>Data: {data}</div>
				<div>Session: {JSON.stringify(session)}</div>
				<Link href={`/e2e/${params.domains}`}>Home</Link>{' '}
			</div>
		</>
	);
}
