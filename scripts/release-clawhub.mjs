#!/usr/bin/env node
// Retired unsafe upload path; all registries share scripts/security/release.py.
console.error('Use python3 scripts/security/release.py prepare --package twitterapi-io --output <outside-checkout> --clawhub-root <reviewed-cli-root>. Upload only through owner-approved CI.');
process.exitCode = 1;
