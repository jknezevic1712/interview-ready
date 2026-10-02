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
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" className={className} disabled={isSubmitting}>
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
