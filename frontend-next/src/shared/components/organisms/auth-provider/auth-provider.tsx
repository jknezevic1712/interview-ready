'use client';

import { redirect, useRouter } from 'next/navigation';
import { createContext, type ReactNode, useEffect, useRef } from 'react';
import { refreshUserToken } from '@/shared/api/server-actions/auth';
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
	statusCode: number;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({
	children,
	user,
	error,
	statusCode,
}: AuthProviderProps) {
	const toastManager = useToastManager();
	const router = useRouter();
	const refreshAttemptRef = useRef(false);

	useEffect(() => {
		if (user || statusCode !== 401 || refreshAttemptRef.current) {
			return;
		}

		refreshAttemptRef.current = true;

		void refreshUserToken().then((response) => {
			if (!response.error) {
				router.refresh();
				return;
			}

			toastManager.add({
				id: 'auth-error',
				type: 'error',
				title: 'Authentication error',
				description: response.error,
			});

			redirect('/auth');
		});
	}, [user, statusCode]);

	return (
		<AuthContext.Provider value={{ user, error }}>
			{children}
		</AuthContext.Provider>
	);
}
