import { concatenateClassnames } from '@/shared/helpers/styles.helper';
import { Button } from '../../../atoms/button';

import type {
	Column_RowSorting,
	RowData,
	TableFeatures,
} from '@tanstack/react-table';
import type { HeaderCellProps } from '@/common/interfaces/table/table.model';

export function HeaderCell<
	TFeatures extends TableFeatures,
	TData extends RowData,
>({ header, FlexRenderCmp }: HeaderCellProps<TFeatures, TData>) {
	const column = header.column;

	const sortableColumn = column as typeof column &
		Column_RowSorting<TFeatures, TData>;

	const canSort = sortableColumn.getCanSort();
	const sorted = sortableColumn.getIsSorted();
	const toggleSorting = sortableColumn.getToggleSortingHandler();

	return (
		<Button
			type="button"
			disabled={!canSort}
			onClick={canSort ? toggleSorting : undefined}
			aria-label={
				canSort
					? sorted === 'asc'
						? 'Sort descending'
						: sorted === 'desc'
							? 'Clear sorting'
							: 'Sort ascending'
					: undefined
			}
			className={concatenateClassnames(
				'group/header inline-flex min-h-8 w-full items-center gap-2 justify-start',
				'px-2 py-1.5',
				'text-left text-xs font-bold uppercase tracking-[0.08em]',
				'transition-colors',
				canSort
					? 'cursor-pointer text-muted-foreground hover:bg-transparent dark:hover:bg-transparent hover:text-foreground'
					: 'cursor-default text-muted-foreground',
				sorted ? 'text-primary' : '',
			)}
			variant="ghost"
		>
			<span className="truncate">
				<FlexRenderCmp header={header} />
			</span>

			{canSort && (
				<span
					aria-hidden="true"
					className={[
						'flex size-3.5 shrink-0 items-center justify-center',
						sorted
							? 'text-primary'
							: 'text-muted-foreground/60 opacity-0 transition-opacity group-hover/header:opacity-100',
					].join(' ')}
				>
					{sorted === 'asc' ? (
						<svg viewBox="0 0 16 16" fill="none" className="size-3.5">
							<title>Sorted ascending</title>

							<path
								d="M4 10L8 6L12 10"
								stroke="currentColor"
								strokeWidth="1.75"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					) : (
						<svg viewBox="0 0 16 16" fill="none" className="size-3.5">
							<title>Sorted descending</title>

							<path
								d="M4 6L8 10L12 6"
								stroke="currentColor"
								strokeWidth="1.75"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					)}
				</span>
			)}
		</Button>
	);
}
