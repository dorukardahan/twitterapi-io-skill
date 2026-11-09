# Repository instructions

## Credential persistence and release gates
- Never write password, API key, token, wallet private key or seed VALUES to memory, daily notes, reports or commits. This includes temporary and chat-supplied credentials. Store only the secret-store reference name.
- Before any memory/note/report persistence, use the checked-write entry below on the COMPLETE proposed content. Do not bypass it with write/edit/shell tools. Review plaintext context too; pattern scanning is not proof of no secrets.
- Publish only from a clean fixed git checkout through scripts/security/release.py, with an exact allowlist, real dry-run manifest and content scan. Never run npm/clawhub publish directly or publish from a workspace.
- Automatic CI releases of twitterapi-io-mcp and twitterapi-docs-mcp retain their main-push workflow and do NOT need per-version approval. Package manifest or scan failures stop publication and require owner review. Do not install main branch protection that blocks daily pushes.
- Manual releases (including ClawHub and domain-search-mcp) require explicit owner approval of the exact commit/version/manifest/digest, with upload credentials confined to the protected release environment.
- Scan full staged contents and commit messages before committing. Preserve existing hooks; never bypass a failed check. Show public repo diffs before pushing.
- Weekly: scan memory/ and reports/ in managed workspaces. Monthly: discover all owner-published ClawHub skills and npm packages and compare each latest manifest to its reviewed allowlist/previous manifest. Missing access is not a clean result.
- On suspected leakage: stop the affected write/commit/release, report only file/service/type (never values or matched text), do not test the credential, and do not rotate it without a separate instruction.
