import { Geist, Geist_Mono, Roboto_Slab } from 'next/font/google';

import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '@/features/header/header';
import { concatenateClassnames } from '@/shared/helpers/styles.helper';

const robotoSlab = Roboto_Slab({
	subsets: ['latin'],
	variable: '--font-serif',
});

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Interview Ready',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
	return (
		<html
			lang="en"
			className={concatenateClassnames(
				'h-full',
				'antialiased',
				geistSans.variable,
				geistMono.variable,
				'font-serif',
				robotoSlab.variable,
			)}
		>
			<body className="min-h-full flex flex-col">
				<Header />

				<main className="px-4">{children}</main>
			</body>
		</html>
	);
}
