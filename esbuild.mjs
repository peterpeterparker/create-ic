import esbuild from 'esbuild';
import {existsSync, mkdirSync, writeFileSync} from 'fs';
import {join} from 'path';

const dist = join(process.cwd(), 'dist');

if (!existsSync(dist)) {
  mkdirSync(dist);
}

const script = esbuild.buildSync({
  entryPoints: ['src/index.ts'],
  bundle: true,
  minify: true,
  platform: 'node',
  write: false
});

writeFileSync('dist/index.js', `#!/usr/bin/env node\n${script.outputFiles[0].text}`);
