import { context } from 'esbuild';

const WATCH = process.argv.includes('--watch');

const ctx = await context({
  entryPoints: ['./src/main.tsx'],
  outfile: './bitburner/bb-plasma.js',
  minify: !WATCH,
  bundle: true,
  format: 'esm',
  loader: { '.svg': 'text', '.css': 'text' },
  alias: {
    'react': 'preact/compat'
  },
  platform: 'browser',
  logLevel: 'info'
});

await ctx.rebuild();

if (WATCH) ctx.watch();
