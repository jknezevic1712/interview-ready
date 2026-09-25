import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: "./backend/src/swagger/openapi.json",

    output: {
      target: "./frontend-next/src/common/generated/api.ts",
      schemas: "./frontend-next/src/common/generated/models",
      client: "fetch",
      baseUrl: {
        runtime: "process.env.API_URL",
      },
      override: {
        mutator: {
          path: "./frontend-next/src/shared/api/helpers/safe-fetch.ts",
          name: "safeFetch",
        },
      },
    },
  },
});
