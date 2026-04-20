import { defineConfig } from '@hey-api/openapi-ts';

export default defineConfig({
  input: '../dist/openapi.yaml',
  output: {
    path: './src/generated',
  },
  plugins: [
    {
      name: '@hey-api/typescript',
      enums: 'javascript',
    },
    {
      name: '@hey-api/sdk',
      auth: true,
    },
    '@hey-api/client-fetch',
  ],
});
