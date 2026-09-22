import type {
	FlexRenderProps,
	Header,
	HeaderGroup,
	RowData,
	RowModel,
	TableFeatures,
} from '@tanstack/react-table';
import type { ReactNode } from 'react';

export interface TableProps<
	TFeatures extends TableFeatures,
	TData extends RowData,
> {
	headerGroups: () => HeaderGroup<TFeatures, TData>[];
	rowModel: () => RowModel<TFeatures, TData>;
	FlexRenderCmp: <TValue>(
		props: FlexRenderProps<TFeatures, TData, TValue>,
	) => ReactNode;
}

export interface HeaderCellProps<
	TFeatures extends TableFeatures,
	TData extends RowData,
> {
	header: Header<TFeatures, TData, unknown>;
	FlexRenderCmp: TableProps<TFeatures, TData>['FlexRenderCmp'];
}
