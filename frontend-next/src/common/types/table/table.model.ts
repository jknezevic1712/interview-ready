export type TableColumnMeta = Partial<{
	className: string;
	width: number;
	minWidth: number;
	maxWidth: number;
	sticky: 'left' | 'right';
	truncate: boolean;
	hideForViewport: number;
}>;
