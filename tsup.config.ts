import { defineConfig } from 'tsup'

export default defineConfig({
  entry: { 'infra/http/server': 'src/infra/http/server.ts' },
  format: ['esm'],
  platform: 'node',
  target: 'node24',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  bundle: true,
  skipNodeModulesBundle: true
})
