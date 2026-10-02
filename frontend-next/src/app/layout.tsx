import type { Metadata } from 'next';
import '../styles/globals.css';
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
			<body className="flex flex-col">
				<Toaster>
					<main className="px-4">{children}</main>
				</Toaster>
			</body>
		</html>
	);
}
