import { useContext } from 'react';
import { logoutUser } from '../api/server-actions/auth';
import { AuthContext } from '../components/organisms/auth-provider/auth-provider';

export function useAuth() {
	const authContext = useContext(AuthContext);
	if (!authContext)
		throw new Error('AuthContext must be used within AuthProvider');

	const logout = async () => {
		await logoutUser();
		// TODO: add toast
		return;
	};

	return {
		user: authContext.user,
		logout,
	};
}
