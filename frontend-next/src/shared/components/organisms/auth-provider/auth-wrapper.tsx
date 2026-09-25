import { type ReactNode, use } from 'react';
import { getUser } from '@/shared/api/auth/auth';
import { AuthProvider } from './auth-provider';

export function AuthWrapper({ children }: { children: ReactNode }) {
	const user = use(getUser());

	return <AuthProvider user={user}>{children}</AuthProvider>;
}
