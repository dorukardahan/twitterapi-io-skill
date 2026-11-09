#!/usr/bin/env node
// Default is dry-run only. --publish requires separate explicit owner approval.
import { execFileSync } from 'node:child_process';
import { mkdtemp, lstat } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { check } from './check-clawhub-package.mjs';
const git = (args, cwd) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
try {
  const [tag, cliArg, mode] = process.argv.slice(2);
  if (!/^v\d+\.\d+\.\d+$/.test(tag || '') || !cliArg || (mode && mode !== '--publish') || process.argv.length > 5)
    throw Error('Usage: node scripts/release-clawhub.mjs vX.Y.Z <clawhub-package-root> [--publish]');
  const cliRoot = resolve(cliArg);
  const parent = await mkdtemp(join(tmpdir(), 'twitterapi-release-'));
  const folder = join(parent, 'source');
  const repo = 'https://github.com/dorukardahan/twitterapi-io-skill.git';
  git(['clone', '--quiet', '--depth', '1', '--branch', tag, '--', repo, folder]);
  const sha = git(['rev-parse', 'HEAD'], folder);
  const clean = () => {
    if (git(['status', '--porcelain', '--untracked-files=all'], folder)) throw Error('Checkout not clean.');
    if (git(['rev-parse', `${tag}^{commit}`], folder) !== sha || git(['rev-parse', 'HEAD'], folder) !== sha)
      throw Error('Release tag/HEAD mismatch.');
  };
  clean();
  git(['ls-files', '--error-unmatch', '.clawhubignore'], folder);
  const files = execFileSync('git', ['ls-files', '-z'], { cwd: folder }).toString().split('\0').filter(Boolean);
  for (const file of files) if ((await lstat(join(folder, file))).isSymbolicLink()) throw Error('Tracked symlink rejected.');
  const report = await check(folder, cliRoot);
  clean();
  console.log(JSON.stringify({ tag, commit: sha, ...report }, null, 2));
  if (mode === '--publish') {
    if (process.env.CLAWHUB_OWNER_APPROVED_TAG !== tag) throw Error('Explicit approval for this exact release tag is required.');
    const final = await check(folder, cliRoot);
    if (final.dryRun.fingerprint !== report.dryRun.fingerprint) throw Error('Package changed after review.');
    clean();
    execFileSync(process.execPath, [join(cliRoot, 'bin/clawdhub.js'), 'skill', 'publish', folder,
      '--slug', 'twitterapi-io', '--owner', 'dorukardahan', '--version', tag.slice(1),
      '--source-repo', 'dorukardahan/twitterapi-io-skill', '--source-commit', sha,
      '--source-ref', `refs/tags/${tag}`, '--source-path', '.', '--json'], { stdio: ['ignore', 'pipe', 'pipe'] });
    console.log('Published the explicitly approved release tag.');
  }
} catch (error) {
  console.error(error.status !== undefined ? 'Release gate failed; inspect checkout/CLI privately. No automatic retry.' : error.message);
  process.exitCode = 1;
}
