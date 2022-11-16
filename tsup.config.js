import { defineConfig } from 'tsup';
import { sassPlugin } from 'esbuild-sass-plugin'
export default defineConfig({
    entry: ['./src/lib/index.ts'],
    format: ['cjs', 'esm'],
    dts: { entry: { "index": "./src/lib/components/SearchBox/types.d.ts" } },
    minify: true,
    clean: true,
    loader: { '.scss': 'css' },
    esbuildPlugins: [sassPlugin()],
    outExtension({ format }) {
        return format === 'esm' ? { js: `.${format}.js` } : { js: `.js` }
    }
});
