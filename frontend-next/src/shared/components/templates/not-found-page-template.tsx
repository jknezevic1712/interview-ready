import { BackButton } from '../organisms/back-button/back-button';
import { RedirectButton } from '../organisms/redirect-button/redirect-button';

export function NotFoundPageTemplate() {
	return (
		<div className="w-full max-w-md mx-auto gap-8 flex flex-col justify-center">
			<div className="flex flex-col gap-2 text-center">
				<h1 className="text-xl xl:text-2xl">Page not found</h1>
				<p className="text-sm xl:text-base">
					Looks like this page doesn't exist or it may have moved somewhere
					else.
				</p>
			</div>

			<div className="flex gap-3 justify-center items-center">
				<BackButton />
				<RedirectButton redirectUrl={'/'} isGlobalNotFoundPage={true}>
					Go home
				</RedirectButton>
			</div>
		</div>
	);
}
