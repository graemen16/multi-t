import { auth } from '@/lib/auth';
import Link from 'next/link';

export default async function Page({ params }: { params: any }) {
	const session = await auth();
	return (
		<div>
			<div>
				Hello from e2e route: {params.domains} : {params.itemid} : {params.slug}{' '}
			</div>
			<div>Subdomain: {params.domains}</div>
			<div>Session: {JSON.stringify(session)}</div>
			<div>
				<Link href={`/e2e/${params.domains}/route1`}>Route 1</Link>
			</div>
			<div>
				<Link href={`/e2e/${params.domains}/route2`}>Route 2</Link>{' '}
			</div>
		</div>
	);
}
