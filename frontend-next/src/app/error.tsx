'use client';

import { useEffect } from 'react';
import { ErrorPageTemplate } from '@/shared/components/templates/error-page';

export default function ErrorPage({
	error,
	retry,
}: {
	error: Error & { digest?: string };
	retry: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.log('ERROR: ', { error });
	}, [error]);

	return <ErrorPageTemplate retry={retry} />;
}
