import '../../styles/globals.css';

export default function AuthLayout({ children }: LayoutProps<'/'>) {
	return <div className="mt-60">{children}</div>;
}
