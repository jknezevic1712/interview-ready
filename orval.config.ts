import { defineConfig } from 'orval';

export default defineConfig({
	api: {
		input: './backend/src/swagger/openapi.json',

		output: {
			target: './frontend/src/common/generated/api.ts',
			schemas: './frontend/src/common/generated/models',
			client: 'fetch',
		},
	},
});