'use client';

import { useSelector } from '@tanstack/react-form';
import { Input } from '@/shared/components/atoms/input/input';
import {
	Field,
	FieldContent,
	FieldError,
	FieldLabel,
} from '@/shared/components/molecules/form/form';
import { useFieldContext } from '@/shared/hooks/use-form';

import type { InputHTMLAttributes } from 'react';

interface FormTextFieldProps {
	label: string;
	description?: string;
	placeholder?: string;
	disabled?: boolean;
	type?: InputHTMLAttributes<HTMLInputElement>['type'];
	autoComplete?: string;
}

export default function FormTextField({
	label,
	description,
	placeholder,
	disabled,
	type = 'text',
	autoComplete = undefined,
}: FormTextFieldProps) {
	const field = useFieldContext<string>();

	const errors = useSelector(field.store, (state) => state.meta.errors);

	const fieldId = field.name;
	const hasErrors = errors.length > 0;

	return (
		<Field invalid={hasErrors} disabled={disabled}>
			<FieldLabel htmlFor={fieldId}>{label}</FieldLabel>

			<FieldContent>
				<Input
					id={fieldId}
					name={field.name}
					value={field.state.value}
					onChange={(event) => field.handleChange(event.target.value)}
					onBlur={field.handleBlur}
					placeholder={placeholder}
					disabled={disabled}
					type={type}
					autoComplete={autoComplete}
					aria-invalid={hasErrors}
					aria-describedby={
						description || hasErrors
							? `${fieldId}-description ${fieldId}-error`
							: undefined
					}
				/>

				{description && <p id={`${fieldId}-description`}>{description}</p>}

				{hasErrors && (
					<FieldError
						id={`${fieldId}-error`}
						errors={errors.map((error) => ({
							message: error instanceof Error ? error.message : String(error),
						}))}
						className="mt-1"
					/>
				)}
			</FieldContent>
		</Field>
	);
}
