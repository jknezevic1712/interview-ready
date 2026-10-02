import '../../styles/globals.css';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
	return (
		<div className="h-dvh flex items-center justify-center">{children}</div>
	);
}
