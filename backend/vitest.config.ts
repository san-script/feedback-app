import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,

    // Only run backend unit tests
    include: ['src/**/*.test.ts'],
  },
});
