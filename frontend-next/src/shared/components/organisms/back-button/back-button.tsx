'use client';

import { useRouter } from 'next/navigation';
import { Button } from '../../atoms/button';

export function BackButton() {
	const router = useRouter();

	return <Button onClick={() => router.back()}>Go back</Button>;
}
