import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, copyFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { allowed } from './check-clawhub-package.mjs';

test('manifest gate rejects workspace/credential/binary/path traversal files', () => {
  for (const p of ['MEMORY.md', 'memory/daily.md', '.env', 'references/.env', 'references/USER.md',
    'skills/x/memory/daily.md', 'references/credentials.md', 'references/key.pem',
    'references/x.bak.md', 'references/session.log', 'references/../SKILL.md',
    'scripts/run.js', 'references/code.js', 'references/reports/example.md',
    'skills/example-skill/reports/example.md', 'references/example.private.md',
    'references/example-LESSONS.md', 'references/example_RULES.md',
    'references/example-session.md', 'references/example-log.json']) assert.equal(allowed(p), false, p);
  for (const p of ['SKILL.md', 'README.md', 'LICENSE', 'references/read-endpoints.md',
    'skills/example-skill/SKILL.md']) assert.equal(allowed(p), true, p);
});

test('real pinned CLI ignores injected workspace files but retains nested skill docs', async () => {
  const root = process.env.CLAWHUB_CLI_ROOT;
  assert.ok(root, 'CLAWHUB_CLI_ROOT required');
  const { prepareSkillFilesForPublish } = await import(pathToFileURL(join(root, 'dist/cli/commands/publish.js')));
  const dir = await mkdtemp(join(tmpdir(), 'clawhub-ignore-test-'));
  await copyFile(new URL('../.clawhubignore', import.meta.url), join(dir, '.clawhubignore'));
  const good = ['SKILL.md', 'README.md', 'references/deep/doc.md', 'skills/x/SKILL.md'];
  const bad = ['MEMORY.md', 'USER.md', 'memory/daily.md', 'sessions/session.md', '.env.local',
    'notes.bak.md', 'trace.log', 'references/credentials.md', 'references/MEMORY.md',
    'skills/x/memory/private.md', 'references/token.key',
    'references/reports/example.md', 'skills/x/reports/example.md',
    'references/example.private.json', 'references/example.private.md',
    'references/example-LESSONS.md', 'references/example_RULES.md',
    'references/example-session.md', 'references/example-log.json'];
  for (const p of [...good, ...bad]) {
    await mkdir(join(dir, p, '..'), { recursive: true });
    await writeFile(join(dir, p), 'synthetic fixture; no credentials');
  }
  const files = await prepareSkillFilesForPublish(dir);
  assert.deepEqual(files.map(f => f.relPath).sort(), good.sort());
  assert.ok(files.every(f => allowed(f.relPath)));
});
