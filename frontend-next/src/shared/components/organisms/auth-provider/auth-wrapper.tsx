import { type ReactNode, use } from 'react';
import { getUser } from '@/shared/api/auth/auth';
import { AuthProvider } from './auth-provider';

export function AuthWrapper({ children }: { children: ReactNode }) {
	const response = use(getUser());

	if (response.error) {
		console.log('ERROR: ', response.error);
		// TODO: show toast
	}

	return <AuthProvider user={response.data}>{children}</AuthProvider>;
}
