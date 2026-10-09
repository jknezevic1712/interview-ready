import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { renderServerComponent } from '@tanstack/react-start/rsc';
import { QuizSessionsTable } from '@/features/quiz-sessions/pages/quiz-sessions.page';

export const getQuizSessionsTable = createServerFn().handler(async () => {
	return await renderServerComponent(<QuizSessionsTable />);
});

export const Route = createFileRoute('/')({
	loader: async () => {
		const [QuizSessionsTable] = await Promise.all([getQuizSessionsTable()]);

		return { QuizSessionsTable };
	},
	component: QuizSessionPage,
});

function QuizSessionPage() {
	const { QuizSessionsTable } = Route.useLoaderData();

	return (
		<section>
			<h1 className="text-2xl font-bold mb-8">Quiz sessions</h1>

			{QuizSessionsTable}
		</section>
	);
}
