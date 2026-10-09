'use client';

import { concatenateClassnames } from '@/shared/helpers/styles.helper';

import type { ComponentProps } from 'react';

type LabelProps = Omit<ComponentProps<'label'>, 'htmlFor'> & {
	htmlFor: string;
};
function Label({ className, htmlFor, children, ...props }: LabelProps) {
	return (
		<label
			data-slot="label"
			htmlFor={htmlFor}
			className={concatenateClassnames(
				'flex items-center gap-2 text-sm leading-none font-medium select-none',
				'group-data-[disabled=true]:pointer-events-none',
				'group-data-[disabled=true]:opacity-50',
				'peer-disabled:cursor-not-allowed',
				'peer-disabled:opacity-50',
				className,
			)}
			{...props}
		>
			{children}
		</label>
	);
}

export { Label };
