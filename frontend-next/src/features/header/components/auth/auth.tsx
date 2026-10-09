'use client';

import Link from 'next/link';
import { ROUTES } from '@/common/constants/routes';
import { Button } from '@/shared/components/atoms/button';
import { useAuth } from '@/shared/hooks/useAuth';

export function Auth() {
	const { user, logout } = useAuth();

	if (!user) {
		return (
			<Link href={ROUTES.auth}>
				<Button type="button">Login</Button>
			</Link>
		);
	}

	return (
		<Button type="button" onClick={logout}>
			Logout
		</Button>
	);
}
