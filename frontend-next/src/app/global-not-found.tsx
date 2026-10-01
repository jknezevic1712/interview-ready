import type { Metadata } from 'next';
import '../styles/globals.css';
import { GlobalNotFoundPageTemplate } from '@/shared/components/templates/global-not-found-page-template/global-not-found-page-template';
import {
	geistMono,
	geistSans,
	metadataProps,
} from '@/shared/helpers/layout.helper';
import { concatenateClassnames } from '@/shared/helpers/styles.helper';

export const metadata: Metadata = {
	...metadataProps,
};

export default function GlobalNotFound() {
	return (
		<html
			lang="en"
			className={concatenateClassnames(
				'h-full',
				'antialiased',
				geistSans.variable,
				geistMono.variable,
				'dark',
			)}
		>
			<body className="min-h-full flex flex-col">
				<main className="px-4 my-auto">
					<GlobalNotFoundPageTemplate />
				</main>
			</body>
		</html>
	);
}
