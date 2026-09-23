import { Button } from '@/shared/components/atoms/button';

export function Header() {
	return (
		<div className="w-full flex justify-end align-center py-2 px-4 border-b-2 border-primary-dark mb-16">
			<Button type="button">USER</Button>
		</div>
	);
}
