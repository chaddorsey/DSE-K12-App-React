import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  outDir: 'lib',
  format: ['cjs'],
  clean: true,
  sourcemap: true,
  target: 'node18',
  onSuccess: 'tsc --emitDeclarationOnly --declaration'
}); 