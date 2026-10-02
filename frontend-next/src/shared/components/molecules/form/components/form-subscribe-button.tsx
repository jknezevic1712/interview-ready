'use client';

import { Button } from '@/shared/components/atoms/button/button';
import { useFormContext } from '@/shared/hooks/use-form';

export function FormSubscribeButton({ label }: { label: string }) {
	const form = useFormContext();
	return (
		<form.Subscribe selector={(state) => state.isSubmitting}>
			{(isSubmitting) => (
				<Button type="submit" disabled={isSubmitting}>
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
