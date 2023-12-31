import { auth } from '@/lib/auth';
import Link from 'next/link';

export default async function Page({ params }: { params: { domains: string } }) {
	const session = await auth();
	return (
		<div>
			<div>Hello: {params.domains} </div>
			<div>Subdomain: {params.domains.split('.')[0]}</div>
			<div>Session: {JSON.stringify(session)}</div>
			<div>
				<Link href={'/route1'}>Route 1</Link>
			</div>
			<div>
				<Link href={'/route2'}>Route 2</Link>{' '}
			</div>
		</div>
	);
}
