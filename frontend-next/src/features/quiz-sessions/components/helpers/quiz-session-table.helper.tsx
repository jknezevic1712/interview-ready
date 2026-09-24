import {
	type ColumnDef,
	createSortedRowModel,
	rowSortingFeature,
	sortFn_textCaseSensitive,
	tableFeatures,
} from '@tanstack/react-table';
import { MOBILE_VIEWPORT_WIDTH } from '@/shared/components/organisms/table/helpers/table.helper';

import type { QuizSessionsTableData } from '@/common/interfaces/quiz-sessions/quiz-sessions-table.model';
import type { TableColumnMeta } from '@/common/types/table/table.model';

export const data: Array<QuizSessionsTableData> = [
	{ id: '1', title: 'Quiz session 1', status: 'IN_PROGRESS' },
	{ id: '2', title: 'Quiz session 2', status: 'COMPLETED' },
	{ id: '3', title: 'Quiz session 3', status: 'ABANDONED' },
];

export const features = tableFeatures({
	rowSortingFeature,
	sortedRowModel: createSortedRowModel(),
	sortFns: { alphanumeric: sortFn_textCaseSensitive },
});

export const columns: Array<ColumnDef<typeof features, QuizSessionsTableData>> =
	[
		{
			header: '#',
			cell: (info) => info.row.index + 1,
			meta: {
				sticky: 'left',
				width: 50,
				hideForViewport: MOBILE_VIEWPORT_WIDTH,
			} as TableColumnMeta,
		},
		{
			accessorKey: 'title' as keyof QuizSessionsTableData,
			header: 'Title',
			cell: (info) => <i>{info.getValue<string>()}</i>,
			meta: {
				sticky: 'left',
				truncate: true,
			} as TableColumnMeta,
		},
		{
			accessorKey: 'status' as keyof QuizSessionsTableData,
			header: 'Status',
		},
	];
