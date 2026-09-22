'use client';

import { useViewportWidth } from '@/shared/hooks/useViewportWidth';
import { HeaderCell } from './components/header-cell';
import {
	getColumnClassName,
	getColumnStyle,
	shouldHideColumn,
} from './helpers/table.helper';

import type { RowData, TableFeatures } from '@tanstack/react-table';
import type { TableProps } from '@/common/interfaces/table/table.model';
import type { TableColumnMeta } from '@/common/types/table/table.model';

export function Table<TFeatures extends TableFeatures, TData extends RowData>({
	headerGroups,
	rowModel,
	FlexRenderCmp,
}: TableProps<TFeatures, TData>) {
	const viewportWidth = useViewportWidth();

	return (
		<div className="w-full max-w-3xl justify-self-center overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
			<div className="overflow-x-auto">
				<table className="w-full table-fixed border-collapse text-sm">
					<thead className="bg-surface-muted">
						{headerGroups().map((headerGroup) => (
							<tr key={headerGroup.id} className="border-b border-border">
								{headerGroup.headers.map((header) => {
									const meta = header.column.columnDef.meta as
										| TableColumnMeta
										| undefined;
									const columnStyle = getColumnStyle(meta);

									return (
										<th
											key={header.id}
											className={[
												'h-12 px-3 text-left align-middle',
												getColumnClassName(meta),
											]
												.filter(Boolean)
												.join(' ')}
											style={columnStyle}
										>
											{shouldHideColumn(
												header.isPlaceholder,
												meta,
												viewportWidth,
											) ? null : (
												<HeaderCell
													header={header}
													FlexRenderCmp={FlexRenderCmp}
												/>
											)}
										</th>
									);
								})}
							</tr>
						))}
					</thead>

					<tbody className="divide-y divide-border">
						{rowModel().rows.map((row) => (
							<tr
								key={row.id}
								className="group transition-colors hover:bg-primary/5"
							>
								{row.getAllCells().map((cell) => {
									const meta = cell.column.columnDef.meta as
										| TableColumnMeta
										| undefined;

									return (
										<td
											key={cell.id}
											className={[
												'px-5 py-4 align-middle text-foreground',
												getColumnClassName(meta),
											]
												.filter(Boolean)
												.join(' ')}
											style={{ width: getColumnStyle(meta).width }}
										>
											<div
												className={meta?.truncate ? 'truncate' : undefined}
												style={{ maxWidth: getColumnStyle(meta).maxWidth }}
											>
												<FlexRenderCmp cell={cell} />
											</div>
										</td>
									);
								})}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
