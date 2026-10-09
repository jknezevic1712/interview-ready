import { BackButton } from '../../atoms/back-button/back-button';
import { GlobalNotFoundPageRedirectButton } from '../../atoms/global-not-found-page-redirect-button/global-not-found-page-redirect-button';

export function GlobalNotFoundPageTemplate() {
	return (
		<div className="w-full max-w-md mx-auto gap-8 flex flex-col justify-center">
			<div className="flex flex-col gap-2 text-center">
				<h1 className="text-2xl xl:text-3xl">Page not found</h1>
				<p className="text-sm xl:text-base">
					Looks like this page doesn't exist or it may have moved somewhere
					else.
				</p>
			</div>

			<div className="flex gap-3 justify-center items-center">
				<BackButton />
				<GlobalNotFoundPageRedirectButton redirectUrl={'/'}>
					Go home
				</GlobalNotFoundPageRedirectButton>
			</div>
		</div>
	);
}
