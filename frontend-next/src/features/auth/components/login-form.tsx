'use client';

import { formOptions } from '@tanstack/react-form';
import { redirect } from 'next/navigation';
import { loginUserViaEmailAndPassword } from '@/shared/api/server-actions/auth';
import { useToastManager } from '@/shared/components/organisms/toast/toast';
import { useAppForm } from '@/shared/hooks/use-form';
import { toLoginUserRequestDTO } from '../helpers/mappers/to-login-user-request-dto';

import type { LoginFormData } from '../helpers/interfaces/login-form-data';

const defaultFormValues: LoginFormData = {
	email: '',
	password: '',
};
const formConfig = formOptions({
	defaultValues: defaultFormValues,
	validators: {
		onChange: ({ value }) => {
			const fields: Partial<LoginFormData> = {};

			if (!value.email) {
				fields.email = 'Email is required';
			}

			if (!value.password) {
				fields.password = 'Password is required';
			}

			return Object.keys(fields).length > 0 ? { fields } : undefined;
		},
	},
});

export function LoginForm() {
	const toastManager = useToastManager();
	const form = useAppForm({
		...formConfig,
		onSubmit: async ({ value }) => {
			await handleSubmit(value);
		},
	});

	const handleSubmit = async (data: LoginFormData) => {
		const request = toLoginUserRequestDTO(data);
		const response = await loginUserViaEmailAndPassword(request);

		if (response.error) {
			toastManager.add({
				id: 'login-error',
				type: 'error',
				title: 'Authentication error',
				description: response.error,
			});
			return;
		}

		redirect('/');
	};

	return (
		<form
			className="flex flex-col gap-4 my-8"
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
		>
			<form.AppField
				name="email"
				children={(field) => (
					<field.TextField label="Email" type="email" autoComplete="email" />
				)}
			/>
			<form.AppField
				name="password"
				children={(field) => (
					<field.TextField
						label="Password"
						type="password"
						autoComplete="current-password"
					/>
				)}
			/>

			<form.AppForm>
				<form.SubscribeButton label="Submit" className="mt-6" />
			</form.AppForm>
		</form>
	);
}
