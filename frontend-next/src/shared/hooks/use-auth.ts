import { redirect } from 'next/navigation';
import { useContext } from 'react';
import { logoutUser } from '../api/server-actions/auth';
import { AuthContext } from '../components/organisms/auth-provider/auth-provider';
import { useToastManager } from '../components/organisms/toast/toast';

export function useAuth() {
	const toast = useToastManager();
	const authContext = useContext(AuthContext);
	if (!authContext)
		throw new Error('AuthContext must be used within AuthProvider');

	const logout = async () => {
		await logoutUser();

		toast.add({
			id: 'user-logout',
			type: 'success',
			title: 'Logged out',
		});

		redirect('/auth');
	};

	return {
		user: authContext.user,
		logout,
	};
}
