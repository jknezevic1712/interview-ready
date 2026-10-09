'use client';

import { formOptions } from '@tanstack/react-form';
import { redirect } from 'next/navigation';
import { registerUserViaEmailAndPassword } from '@/shared/api/server-actions/auth';
import { useToastManager } from '@/shared/components/organisms/toast/toast';
import { useAppForm } from '@/shared/hooks/use-form';
import { toCreateUserRequestDTO } from '../helpers/mappers/to-create-user-request-dto';

import type { RegistrationFormData } from '../helpers/interfaces/registration-form-data';

const defaultFormValues: RegistrationFormData = {
	email: '',
	name: '',
	password: '',
};
const formConfig = formOptions({
	defaultValues: defaultFormValues,
	validators: {
		onChange: ({ value }) => {
			const fields: Partial<RegistrationFormData> = {};

			if (!value.email) {
				fields.email = 'Email is required';
			}

			if (!value.name) {
				fields.name = 'Name is required';
			}

			if (!value.password) {
				fields.password = 'Password is required';
			}

			return Object.keys(fields).length > 0 ? { fields } : undefined;
		},
	},
});

export function RegistrationForm() {
	const toast = useToastManager();
	const form = useAppForm({
		...formConfig,
		onSubmit: async ({ value }) => {
			await handleSubmit(value);
		},
	});

	const handleSubmit = async (data: RegistrationFormData) => {
		const request = toCreateUserRequestDTO(data);
		const response = await registerUserViaEmailAndPassword(request);

		if (response.error) {
			toast.add({
				id: 'registration-error',
				type: 'error',
				title: 'Authentication error',
				description: response.error,
			});
			return;
		}

		toast.add({
			id: 'registration-success',
			type: 'success',
			title: 'Registered successfully',
		});

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
				name="name"
				children={(field) => (
					<field.TextField label="Name" autoComplete="name" />
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
