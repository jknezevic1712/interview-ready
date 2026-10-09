import { useContext } from 'react';
import { AuthContext } from '../components/organisms/auth-provider/auth-provider';

export function useAuth() {
	const authContext = useContext(AuthContext);
	if (!authContext)
		throw new Error('AuthContext must be used within AuthProvider');

	const login = () => {
		console.log('LOGIN');
		return;
	};

	const logout = () => {
		console.log('LOGOUT');
		return;
	};

	return {
		user: authContext.user,
		login,
		logout,
	};
}
