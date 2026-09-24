'use client';

import { createContext, type ReactNode } from 'react';

import type { GetUserResponse } from '@/common/generated/models';

interface AuthContextType {
	user: GetUserResponse | null;
}
interface AuthProviderProps {
	children: ReactNode;
	user: GetUserResponse | null;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children, user }: AuthProviderProps) {
	return (
		<AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
	);
}
