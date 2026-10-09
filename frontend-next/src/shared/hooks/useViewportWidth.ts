import { useEffect, useState } from 'react';

export function useViewportWidth() {
	const [viewportWidth, setViewportWidth] = useState<number | null>(null);

	useEffect(() => {
		const handleResize = () => {
			setViewportWidth(window.innerWidth);
		};

		handleResize();

		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return viewportWidth;
}
