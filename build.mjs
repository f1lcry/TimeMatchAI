import * as esbuild from 'esbuild';

const watch = process.argv.includes('--watch');

const config = {
  entryPoints: ['static/landing/js/src/main.js'],
  bundle: true,
  minify: !watch,
  sourcemap: watch ? 'inline' : false,
  format: 'iife',
  target: ['es2020'],
  loader: { '.jsx': 'jsx', '.js': 'jsx' },
  jsx: 'automatic',
  define: {
    'process.env.NODE_ENV': watch ? '"development"' : '"production"',
  },
  outfile: 'static/landing/js/dist/main.js',
  logLevel: 'info',
};

if (watch) {
  const ctx = await esbuild.context(config);
  await ctx.watch();
  console.log('esbuild: watching…');
} else {
  await esbuild.build(config);
  console.log('esbuild: built static/landing/js/dist/main.js');
}
