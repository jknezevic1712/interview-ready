import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '@/features/header/header';
import { AuthWrapper } from '@/shared/components/organisms/auth-provider/auth-wrapper';
import { Toaster } from '@/shared/components/organisms/toast/toast';
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

export default function RootLayout({ children }: LayoutProps<'/'>) {
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
				<Toaster>
					<AuthWrapper>
						<Header />

						<main className="px-4">{children}</main>
					</AuthWrapper>
				</Toaster>
			</body>
		</html>
	);
}
