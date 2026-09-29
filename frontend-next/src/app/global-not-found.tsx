import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import '../styles/globals.css';
import { NotFoundPageTemplate } from '@/shared/components/templates/not-found-page-template';
import { concatenateClassnames } from '@/shared/helpers/styles.helper';

const geistSans = Geist({
	variable: '--font-type-heading',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-type-body',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Interview Ready',
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
					<NotFoundPageTemplate />
				</main>
			</body>
		</html>
	);
}
