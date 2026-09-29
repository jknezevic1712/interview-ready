import type { Metadata } from 'next';
import '../styles/globals.css';
import { Header } from '@/features/header/header';
import { AuthWrapper } from '@/shared/components/organisms/auth-provider/auth-wrapper';
import { Toaster } from '@/shared/components/organisms/toast/toast';
import {
	geistMono,
	geistSans,
	metadataProps,
} from '@/shared/helpers/layout.helper';
import { concatenateClassnames } from '@/shared/helpers/styles.helper';

export const metadata: Metadata = {
	...metadataProps,
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
