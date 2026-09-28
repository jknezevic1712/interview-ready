import { type ReactNode, use } from 'react';
import { getUser } from '@/shared/api/auth/auth';
import { AuthProvider } from './auth-provider';

export function AuthWrapper({ children }: { children: ReactNode }) {
	const response = use(getUser());

	return (
		<AuthProvider user={response.data} error={response.error}>
			{children}
		</AuthProvider>
	);
}
