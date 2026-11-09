#!/usr/bin/env node
// Read-only gate. Uses the pinned CLI's actual packer, never a guessed glob list.
import { readFile, lstat } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { execFileSync } from 'node:child_process';

export function allowed(path) {
  const parts = path.split('/');
  if (parts.some(p => !p || p === '.' || p === '..' || p.startsWith('.') ||
      /(?:credential|secret|password|token|api[-_]?key|\.bak|\.log$|\.pem$|\.key$|\.private(?:\.|$)|[-_]lessons\.md$|[-_]rules\.md$|[-_]session\.md$|[-_]log\.json$)/i.test(p) ||
      /^(?:memory|sessions|reports|AGENTS\.md|MEMORY\.md|USER\.md|SOUL\.md|IDENTITY\.md|TOOLS\.md|HEARTBEAT\.md)$/i.test(p))) return false;
  return ['SKILL.md', 'README.md', 'CHANGELOG.md', 'LICENSE'].includes(path) ||
    /^(?:references|skills)\/.+\.(?:md|txt)$/i.test(path);
}

export async function check(folder, cliRoot, slug = 'twitterapi-io', offline = false) {
  folder = resolve(folder); cliRoot = resolve(cliRoot);
  const pkg = JSON.parse(await readFile(join(cliRoot, 'package.json'), 'utf8'));
  if (pkg.name !== 'clawhub' || pkg.version !== '0.25.1') throw Error('Unreviewed CLI version; review packer and re-run tests.');
  const { prepareSkillFilesForPublish } = await import(pathToFileURL(join(cliRoot, 'dist/cli/commands/publish.js')));
  const { hashSkillFiles } = await import(pathToFileURL(join(cliRoot, 'dist/skills.js')));
  const files = await prepareSkillFilesForPublish(folder);
  if (!files.some(f => f.relPath === 'SKILL.md')) throw Error('Root SKILL.md missing.');
  for (const file of files) {
    if (!allowed(file.relPath)) throw Error('Package contains a non-allowlisted file.');
    let current = folder;
    for (const part of file.relPath.split('/')) {
      current = join(current, part);
      if ((await lstat(current)).isSymbolicLink()) throw Error('Symlink in package path.');
    }
  }
  const before = hashSkillFiles(files);
  if (offline) return { ok: true, cliVersion: pkg.version, dryRun: { status: 'offline-packer', fileCount: files.length, fingerprint: before.fingerprint }, files: before.files };
  const output = execFileSync(process.execPath, [join(cliRoot, 'bin/clawdhub.js'), 'skill', 'publish', folder,
    '--slug', slug, '--owner', 'dorukardahan', '--dry-run', '--json'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
  const dryRun = JSON.parse(output);
  const after = hashSkillFiles(await prepareSkillFilesForPublish(folder));
  if (!dryRun.ok || !['would-publish', 'unchanged'].includes(dryRun.status) ||
      dryRun.fileCount !== files.length || dryRun.fingerprint !== before.fingerprint ||
      after.fingerprint !== before.fingerprint) throw Error('Dry-run manifest/count/fingerprint mismatch.');
  return { ok: true, cliVersion: pkg.version, dryRun, files: before.files };
}

if (process.argv[1] && resolve(process.argv[1]) === resolve(new URL(import.meta.url).pathname)) {
  try {
    if (![4, 5].includes(process.argv.length) || (process.argv[4] && process.argv[4] !== '--offline')) throw Error('Usage: node scripts/check-clawhub-package.mjs <folder> <clawhub-package-root>');
    console.log(JSON.stringify(await check(process.argv[2], process.argv[3], 'twitterapi-io', process.argv[4] === '--offline'), null, 2));
  } catch (error) {
    // Never echo CLI output or file contents on a failure.
    console.error(error.status !== undefined ? 'ClawHub dry-run failed; no upload performed.' : error.message);
    process.exitCode = 1;
  }
}
