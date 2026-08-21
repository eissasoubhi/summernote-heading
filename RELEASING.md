# Releasing Summernote Heading

Summernote Heading follows semantic versioning. Source readiness and green CI do **not** authorize publication by themselves.

Before publishing a release:

1. start from the exact public `main` commit intended for release;
2. run a clean `npm ci` followed by `npm run check`;
3. verify `npm pack --dry-run` contains only the intended distributable files;
4. require the release tag/version guard to be green in ordinary package CI;
5. validate standalone Heading behavior and Bricks composition in the maintained Summernote 0.9.1 browser matrix;
6. document any option, package-entrypoint, generated HTML, migration or compatibility change;
7. require explicit maintainer approval before npm publication.

Breaking changes to public options, package entrypoints, persisted Heading markup/data or supported host versions require a major release.

## Ecosystem independence

`summernote-heading` is a standalone Summernote plugin. It does **not** currently depend on `SNB-components` or require a synchronized shared-core release. Keep that independence unless a future implementation introduces a real runtime dependency and the package manifest explicitly declares it.

`summernote-bricks` is an optional composer. A Heading release does not require a Bricks release unless Bricks itself needs a compatibility or dependency-range change.

## Exact browser-tested artifact

For an ecosystem release wave, the authoritative Bricks compatibility workflow builds the current Heading `main` package as a real npm tarball before running the browser matrix. A successful release-readiness run records that tarball's filename, SHA-256 and byte size and archives the exact `.tgz` together with Bricks/Gallery candidates and `public-heads.json`.

If Heading is being published from such a validated release wave, use the exact archived Heading `.tgz` after verifying its digest against `public-heads.json`; do not rebuild a replacement tarball after browser validation.

## Publishing model

The preferred long-term publishing model is npm trusted publishing from GitHub Actions using OIDC with provenance enabled. Trusted publishing must be configured and verified on npm before enabling any automated publish action; CI must not require a long-lived npm token merely for release-readiness validation.

Until publication is explicitly approved, automation stops at package construction and validation. After publication, verify the public npm artifact in a clean consumer project before creating matching Git tags or GitHub Releases.
