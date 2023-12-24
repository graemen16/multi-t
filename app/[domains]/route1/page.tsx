export default function Page({ params }: { params: { domains: string } }) {
	return <div>Route 1 from server: {params.domains}</div>;
}
