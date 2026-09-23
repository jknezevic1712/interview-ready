import { useState } from 'react';

export function useAuth() {
	const [user, setUser] = useState(null); // TODO move to context

	const login = () => {
		console.log('LOGIN');
		return;
	};

	const logout = () => {
		console.log('LOGOUT');
		return;
	};

	return {
		user,
		login,
		logout,
	};
}
