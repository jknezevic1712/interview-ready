'use client';

import { useTable } from '@tanstack/react-table';
import { Table } from '@/shared/components/table/table';
import { columns, data, features } from './helpers/quiz-session-table.helper';

export function QuizSessionsTable() {
	const table = useTable({
		key: 'quiz-sessions-table',
		features,
		columns,
		data,
	});

	return (
		<Table
			headerGroups={table.getHeaderGroups}
			rowModel={table.getRowModel}
			FlexRenderCmp={table.FlexRender}
		/>
	);
}
