import { context, build } from 'esbuild';
import { gzip } from 'node-gzip';

const WATCH = process.argv.includes('--watch');

/** @type import('esbuild').Plugin*/
const netscriptLoaderPlugin = {
  name: 'NetscriptLoader',
  setup: function (pluginBuild) {
    pluginBuild.onLoad({ filter: /.*\.ns\.ts[x]?$/ }, async (args) => {

      const { path } = args;

      const script = (await build({
        entryPoints: [path],
        write: false,
        bundle: true,
        minify: !WATCH,
        format: 'esm',
        platform: 'browser',
        logLevel: 'info',
        loader: { '.svg': 'text', '.css': 'text' },
        external: ['bb-plasma'],
        alias: {
          'react': 'preact/compat'
        },
      })).outputFiles[0].text;

      return {
        contents: Buffer.from(script).toString('base64'),
        loader: 'text'
      };
    });
  }
};

const ctx = await context({
  entryPoints: ['./src/main.tsx'],
  outfile: './bitburner/bb-plasma.js',
  plugins: [netscriptLoaderPlugin],
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
else ctx.dispose();
