import { Geist, Geist_Mono } from 'next/font/google';

import type { Metadata } from 'next';

export const geistSans = Geist({
	variable: '--font-type-heading',
	subsets: ['latin'],
});

export const geistMono = Geist_Mono({
	variable: '--font-type-body',
	subsets: ['latin'],
});

export const metadataProps: Metadata = {
	title: 'Interview Ready',
};
