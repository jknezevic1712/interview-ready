import { Auth } from './components/auth/auth';

export function Header() {
	return (
		<div className="w-full flex justify-end align-center py-2 px-4 border-b-2 border-primary mb-16">
			<Auth />
		</div>
	);
}
