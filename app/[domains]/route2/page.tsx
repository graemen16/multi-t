'use client';

import Link from 'next/link';
import React from 'react';

export default function Page({ params }: { params: { domains: string } }) {
	// get from data route
	const [data, setData] = React.useState<any>(null);
	React.useEffect(() => {
		console.log('fetching data');
		const fetchData = async () => {
			const res = await fetch('api/data');
			console.log('res', res);

			const data = await res.json();
			setData(data);
		};
		fetchData();
	}, []);
	return (
		<>
			<div>
				<div>Route 2 (Client component): {params.domains}</div>
				<div>Data: {data}</div>
				<Link href={'/'}>Home</Link>{' '}
			</div>
		</>
	);
}
