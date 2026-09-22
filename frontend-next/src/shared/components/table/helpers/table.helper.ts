import type { TableColumnMeta } from '@/common/types/table/table.model';

const DEFAULT_COLUMN_WIDTH = 180;
const DEFAULT_MAX_WIDTH = 240;
export const MOBILE_VIEWPORT_WIDTH = 500;

export function getStickyClass(sticky?: TableColumnMeta['sticky']) {
	switch (sticky) {
		case 'left':
			return 'sticky left-0 z-20 bg-surface';

		case 'right':
			return 'sticky right-0 z-20 bg-surface';

		default:
			return undefined;
	}
}

export function getColumnClassName(meta?: TableColumnMeta) {
	return [getStickyClass(meta?.sticky), meta?.className]
		.filter(Boolean)
		.join(' ');
}

export function getColumnStyle(meta?: TableColumnMeta) {
	return {
		width: meta?.width ?? DEFAULT_COLUMN_WIDTH,
		minWidth: meta?.minWidth,
		maxWidth: meta?.maxWidth ?? DEFAULT_MAX_WIDTH,
	};
}

export function shouldHideColumn(
	isPlaceholder: boolean,
	meta: TableColumnMeta | undefined,
	viewportWidth: number | null,
) {
	if (isPlaceholder) return true;
	if (!meta) return false;

	if (meta.hideForViewport && viewportWidth !== null) {
		return viewportWidth <= meta.hideForViewport;
	}

	return false;
}
