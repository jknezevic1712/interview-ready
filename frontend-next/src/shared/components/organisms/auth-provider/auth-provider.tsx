'use client';

import { createContext, type ReactNode, useEffect } from 'react';
import { useToastManager } from '@/shared/components/organisms/toast/toast';

import type { GetUserLiteResponse } from '@/common/generated/models';

interface AuthContextType {
	user: GetUserLiteResponse | null;
	error: string | null;
}
interface AuthProviderProps {
	children: ReactNode;
	user: GetUserLiteResponse | null;
	error: string | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, user, error }: AuthProviderProps) {
	const toastManager = useToastManager();

	useEffect(() => {
		if (!error) {
			return;
		}

		toastManager.add({
			id: 'auth-error',
			type: 'error',
			title: 'Authentication error',
			description: error,
		});
	}, [error]);

	return (
		<AuthContext.Provider value={{ user, error }}>
			{children}
		</AuthContext.Provider>
	);
}
