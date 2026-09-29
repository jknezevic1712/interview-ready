'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../atoms/button';

import type { ReactNode } from 'react';

interface RedirectButtonProps {
	children: ReactNode;
	redirectUrl: string;
	isGlobalNotFoundPage?: boolean;
}
export function RedirectButton({
	children,
	redirectUrl,
	isGlobalNotFoundPage = false,
}: RedirectButtonProps) {
	const router = useRouter();

	const handleRedirect = () => {
		if (isGlobalNotFoundPage) {
			// There is a long-standing Next.js issue with client-side navigation
			// from a global not-found page where the URL changes but the page doesn't update.
			//
			// And the current Next.js documentation confirms why this behaves differently
			// global-not-found is handled at the routing level, bypasses the normal app rendering/layout tree, and directly returns the global page
			// since it is not a normal route-segment not-found.tsx.
			window.location.href = redirectUrl;
			return;
		}

		router.push(redirectUrl);
	};

	return <Button onClick={handleRedirect}>{children}</Button>;
}
