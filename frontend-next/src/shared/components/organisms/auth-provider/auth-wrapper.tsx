import { AuthProvider } from './auth-provider';

import type { ReactNode } from 'react';

export function AuthWrapper({ children }: { children: ReactNode }) {
	return <AuthProvider user={null}>{children}</AuthProvider>;
}
