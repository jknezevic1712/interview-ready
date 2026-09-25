'use client';

import { createContext, type ReactNode } from 'react';

import type { GetUserLiteResponse } from '@/common/generated/models';

interface AuthContextType {
	user: GetUserLiteResponse | null;
}
interface AuthProviderProps {
	children: ReactNode;
	user: GetUserLiteResponse | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, user }: AuthProviderProps) {
	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}
