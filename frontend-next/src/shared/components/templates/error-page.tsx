import { RedirectType, redirect } from 'next/navigation';
import { Button } from '../atoms/button';

interface ErrorPageTemplateProps {
	retry: () => void;
}
export function ErrorPageTemplate({ retry }: ErrorPageTemplateProps) {
	return (
		<div className="w-full max-w-md mx-auto gap-8 flex flex-col justify-center">
			<div className="flex flex-col gap-2 text-center">
				<h1 className="text-xl xl:text-2xl">Something went wrong</h1>
				<p className="text-sm xl:text-base">
					We couldn't load this page right now. Please try again in a moment.
				</p>
			</div>

			<div className="flex gap-3 justify-center items-center">
				<Button onClick={retry}>Try again</Button>
				<Button onClick={() => redirect('/', RedirectType.replace)}>
					Go home
				</Button>
			</div>
		</div>
	);
}
