import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/organisms/tabs/tabs';

enum AuthTabs {
	Login = 'login',
	Register = 'register',
}

export function AuthFeature() {
	return (
		<div className="w-full flex justify-center">
			<Tabs defaultValue={AuthTabs.Login} className="w-md">
				<TabsList variant="line">
					<TabsTrigger value={AuthTabs.Login}>Login</TabsTrigger>
					<TabsTrigger value={AuthTabs.Register}>Register</TabsTrigger>
				</TabsList>
				<TabsContent value={AuthTabs.Login}>Login form</TabsContent>
				<TabsContent value={AuthTabs.Register}>Registration form</TabsContent>
			</Tabs>
		</div>
	);
}

export function LoginForm() {
	return <div>TODO</div>;
}
