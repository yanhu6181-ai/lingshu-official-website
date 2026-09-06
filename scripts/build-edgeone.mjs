import { cp, glob, mkdir, readFile, rm, stat, symlink, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const stage = path.join(root, 'work', 'edgeone-static');
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const name of ['app', 'public', 'next.config.ts', 'tsconfig.json', 'package.json', 'postcss.config.mjs']) {
  await cp(path.join(root, name), path.join(stage, name), { recursive: true,
    filter: source => source !== path.join(root, 'app', 'api') });
}
await symlink(path.join(root, 'node_modules'), path.join(stage, 'node_modules'), 'dir');
const result = spawnSync(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'], {
  cwd: stage, stdio: 'inherit', env: { ...process.env, EDGEONE_STATIC_EXPORT: '1' },
});
if (result.status !== 0) process.exit(result.status ?? 1);
const output = path.join(root, 'out');
await rm(output, { recursive: true, force: true });
await cp(path.join(stage, 'out'), output, { recursive: true });
// Next copies legacy public assets too. Remove only files absent from every emitted text asset.
const searchableFiles = [];
for await (const file of glob('**/*.{html,css,js,xml,json}', { cwd: output })) {
  if ((await stat(path.join(output, file))).isFile()) searchableFiles.push(file);
}
const searchable = (await Promise.all(searchableFiles.map(file => readFile(path.join(output, file), 'utf8')))).join('\n');
for await (const file of glob('**/*', { cwd: output })) {
  if (file.startsWith('_next/') || /(^|\/)index\.html$/.test(file) || ['robots.txt', 'sitemap.xml'].includes(file)) continue;
  const candidate = path.join(output, file);
  const info = await stat(candidate);
  if (info.isFile() && !searchable.includes('/' + file)) await rm(candidate);
}
await writeFile(path.join(output, 'release.json'), JSON.stringify({
  commit: spawnSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).stdout.trim(),
  builtAt: new Date().toISOString(),
  booking: 'email',
}));
console.log(`EdgeOne static deployment assets: ${output}`);
