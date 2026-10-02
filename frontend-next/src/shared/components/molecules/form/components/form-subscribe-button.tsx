'use client';

import { Button } from '@/shared/components/atoms/button/button';
import { useFormContext } from '@/shared/hooks/use-form';

interface FormSubscribeButtonProps {
	label: string;
	className: string;
}
export function FormSubscribeButton({
	label,
	className,
}: FormSubscribeButtonProps) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				isDirty: state.isDirty,
				canSubmit: state.canSubmit,
			})}
		>
			{({ isSubmitting, isDirty, canSubmit }) => (
				<Button
					type="submit"
					className={className}
					disabled={isSubmitting || !isDirty || !canSubmit}
				>
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
