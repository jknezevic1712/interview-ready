import { type ReactNode } from 'react';
import { getUser } from '@/shared/api/server-actions/auth';
import { AuthProvider } from './auth-provider';

export async function AuthWrapper({ children }: { children: ReactNode }) {
	const response = await getUser();

	return (
		<AuthProvider
			user={response.data}
			error={response.error}
			statusCode={response.statusCode}
		>
			{children}
		</AuthProvider>
	);
}
