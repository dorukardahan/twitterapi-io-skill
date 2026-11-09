# Publishing

All uploads now use `scripts/security/release.py` and the owner-approved
GitHub Actions workflow. The old `release-clawhub.mjs --publish` path is disabled.

1. Commit reviewed changes and run the guard tests.
2. Run `python3 scripts/security/release.py prepare --package twitterapi-io --output <outside-checkout> --clawhub-root <reviewed-cli-root>`.
3. Review the real file list, content hashes and diff against the latest published version.
4. Dispatch **Owner-approved ClawHub release** on the reviewed commit/ref.
5. Inspect the preflight artifact manifest before approving the protected
   `owner-approved-release` environment. Only the owner can approve; no automatic ClawHub upload.
6. Verify the registry manifest after upload.

The exact file allowlist is `scripts/security/release-policy.json`. Existing
ClawHub packer validation and `.clawhubignore` remain in force. The reviewed CLI
is pinned to 0.25.1 with an npm lockfile. Upload credentials belong only to the
protected environment, not the ordinary agent process. No old tags are republished.

See `scripts/security/README.md` for threat model and limitations.
