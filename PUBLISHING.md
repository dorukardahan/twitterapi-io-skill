# ClawHub release gate

Publish only from a new checkout of `https://github.com/dorukardahan/twitterapi-io-skill.git`
at an exact release tag. Never publish/sync a workspace or an installed skill directory.
The release script creates that checkout itself and refuses dirty trees, symlinks,
or tags that do not track `.clawhubignore`. Existing tags without the fix are intentionally blocked.

## Checklist

1. Review changes; run the package tests. Obtain explicit owner approval before pushing.
2. Land the reviewed changes and select a release tag containing the packaging guard.
   Do not move old tags or overwrite published versions.
3. Use reviewed ClawHub CLI **0.25.1**. Set `CLAWHUB_CLI_ROOT` to its package directory.
   This is a filesystem path, not a credential. CLI upgrades require revalidating the gate.
4. Run the release preflight (no upload):
   `node scripts/release-clawhub.mjs vX.Y.Z "$CLAWHUB_CLI_ROOT"`.
5. Review the exact commit, every manifest path, file count and fingerprint.
   Allowed roots are SKILL.md, README.md, CHANGELOG.md, LICENSE, references/, skills/.
   Inside the two directories only reviewed Markdown/text documentation is allowed;
   workspace names, credentials, backups, logs and symlinks are rejected even there.
   Review selected file contents for secrets and personal/operational information as well.
6. The gate runs `clawhub skill publish <checkout> --dry-run --json` before upload.
   CLI 0.25.1 returns count/fingerprint but not file paths. Therefore the gate also uses
   **that same CLI's `prepareSkillFilesForPublish`** and compares its manifest/hash with
   the dry-run, both before and after. Unknown CLI versions, schema changes, invalid
   paths, missing files and mismatches fail closed.
7. Obtain separate explicit owner approval for the exact new version and reviewed manifest.
   Only after approval, run:
   `CLAWHUB_OWNER_APPROVED_TAG=vX.Y.Z node scripts/release-clawhub.mjs vX.Y.Z "$CLAWHUB_CLI_ROOT" --publish`.
   The environment marker records that approval was obtained; it does not grant permission.
8. Verify the published version's manifest and installation in an isolated directory.

Local packaging test without a release or upload:

```sh
CLAWHUB_CLI_ROOT=/path/to/clawhub node --test scripts/check-clawhub-package.test.mjs
node scripts/check-clawhub-package.mjs /absolute/source/path /path/to/clawhub
```

The allowlist excludes this maintenance document, scripts and CI files from the skill.
No GitHub Actions publishing has been enabled. An owner-approved future workflow can
call this same gate with protected-environment approval; automation is not required here.
