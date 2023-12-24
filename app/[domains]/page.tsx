import Link from 'next/link';

export default function Page({ params }: { params: { domains: string } }) {
	return (
		<div>
			<div>My Post: {params.domains} </div>
			<div>
				<Link href={'/route1'}>Route 1</Link>
			</div>
			<div>
				<Link href={'/route2'}>Route 2</Link>{' '}
			</div>
		</div>
	);
}
