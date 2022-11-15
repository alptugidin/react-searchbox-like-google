import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin'
export default defineConfig({
    entry: ['./src/lib/index.ts'],
    format: ['cjs', 'esm'],
    // dts: { resolve: "./src/lib/components/SearchBox/types.d.ts" },
    // dts: true,
    clean: true,
    legacyOutput: true,
    loader: { '.scss': 'css' },
    esbuildPlugins: [sassPlugin()]
});
