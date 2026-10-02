import { Header } from '@/features/header/header';
import '../../styles/globals.css';
import { AuthWrapper } from '@/shared/components/organisms/auth-provider/auth-wrapper';

export default function QuizSessionsLayout({ children }: LayoutProps<'/'>) {
	return (
		<AuthWrapper>
			<Header />

			{children}
		</AuthWrapper>
	);
}
