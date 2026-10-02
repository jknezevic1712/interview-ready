import { AuthTabs } from '@/common/enums/auth-tabs';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/shared/components/molecules/tabs/tabs';
import { LoginForm } from './components/login-form';

export async function AuthFeature() {
	return (
		<div className="w-full flex justify-center">
			<Tabs defaultValue={AuthTabs.Login} className="w-md">
				<TabsList variant="line">
					<TabsTrigger value={AuthTabs.Login}>Login</TabsTrigger>
					<TabsTrigger value={AuthTabs.Register}>Register</TabsTrigger>
				</TabsList>
				<TabsContent value={AuthTabs.Login}>
					<LoginForm />
				</TabsContent>
				<TabsContent value={AuthTabs.Register}>Registration form</TabsContent>
			</Tabs>
		</div>
	);
}
