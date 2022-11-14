import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin'
export default defineConfig({
    // entry: ['./src/lib/index.ts'],
    entry: ['./src/lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: true,
    legacyOutput: true,
    loader: { '.scss': 'css' },
    esbuildPlugins: [sassPlugin()]
});
