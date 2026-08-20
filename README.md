# Summernote Heading

Summernote Heading is a standalone Summernote 0.9.x plugin for creating and editing semantic heading blocks. It can be composed by Summernote Bricks, but **Summernote Bricks is not required**.

## v3 source status

The public `main` branch contains the **3.0.0-rc.0 source/package contract**. The v3 implementation is native to Summernote's plugin lifecycle and no longer depends on the historical shared SNB runtime described by older documentation.

The maintained ecosystem compatibility matrix validates Heading with Summernote 0.9.1 across BS3, BS4, BS5 and Lite builds under Chromium, Firefox and WebKit.

Package publication is separate from source readiness. Verify the registry version you intend to consume instead of assuming the v3 RC has been published.

## Features

- standalone `summernoteHeading` toolbar plugin;
- semantic H1-H6 content with optional subtitle and anchor;
- create and edit through a Summernote-native dialog;
- double-click editing of existing v3 heading blocks;
- undo-aware edits through Summernote commands;
- accessible labels, focus handling and error feedback;
- clean persisted HTML marked with `data-snb-brick="heading"` and `data-snb-version="3"`;
- explicit, opt-in helpers for migrating legacy Heading markup;
- ESM, CommonJS/browser bundle and TypeScript declarations.

## Package contract

The v3 root manifest exposes:

```text
dist/index.js          ESM
dist/index.umd.cjs     CommonJS / browser bundle
dist/types/index.d.ts  TypeScript declarations
```

Host peer dependencies:

```json
{
  "jquery": ">=3.6.0 <4",
  "summernote": ">=0.9.1 <0.10"
}
```

## Browser usage

Load jQuery, the Summernote build matching your Bootstrap/Lite setup, then the Heading bundle before initializing the editor:

```html
<script src="path/to/jquery.js"></script>
<script src="path/to/summernote.js"></script>
<script src="path/to/summernote-heading/dist/index.umd.cjs"></script>
```

Then add `summernoteHeading` to the toolbar:

```js
$('#summernote').summernote({
  toolbar: [
    ['extensions', ['summernoteHeading']]
  ],
  summernoteHeading: {
    buttonLabel: 'Heading',
    tooltip: 'Insert heading',
    defaultLevel: 2,
    dialogTitle: 'Heading',
    saveText: 'Save',
    titleLabel: 'Title',
    subtitleLabel: 'Subtitle',
    levelLabel: 'Level',
    anchorLabel: 'Anchor'
  }
});
```

## Persisted content

Heading v3 stores semantic HTML instead of opaque runtime JSON or editor controls. A generated block has this shape:

```html
<div class="snb-brick snb-heading" data-snb-brick="heading" data-snb-version="3" contenteditable="false">
  <h2 class="snb-heading__title" id="example-anchor">Example heading</h2>
  <p class="snb-heading__subtitle">Optional subtitle</p>
</div>
```

The public content helpers include `renderHeading`, `parseHeading`, `parseLegacyHeading` and `migrateLegacyHeading`. Legacy conversion is intentionally separate from normal parsing so loading an editor does not silently rewrite stored content.

## Module usage

The module entry exports `SummernoteHeadingV3` plus the heading data/content helpers:

```js
import {
  SummernoteHeadingV3,
  renderHeading,
  parseHeading,
  migrateLegacyHeading
} from 'summernote-heading';
```

The browser bundle self-registers `summernoteHeading` when loaded after Summernote.

## Development

```bash
npm ci
npm run check
```

`npm run check` performs strict TypeScript checking, Vitest tests, Vite/TypeScript builds and package-shape validation. The cross-repository Bricks compatibility harness additionally tests the packed Heading artifact against the supported Summernote/browser matrix.

## Compatibility

The maintained reference is Summernote **0.9.1** with:

- Bootstrap 3 build;
- Bootstrap 4 build;
- Bootstrap 5 build;
- Summernote Lite;
- Chromium, Firefox and WebKit.

The historical 0.8.18 demo and old bundle paths are legacy references, not the v3 contract.

## Ecosystem

- `summernote-heading` — this standalone semantic Heading plugin;
- `summernote-gallery` — standalone backend-agnostic Gallery plugin;
- `summernote-bricks` — optional composer of registered plugin buttons and central browser compatibility harness;
- `SNB-components` — independent optional shared core; Heading does not currently depend on it.

See the Summernote Bricks roadmap issue #3 for ecosystem release-readiness status.

## Contributing, security and release

See `CONTRIBUTING.md`, `SECURITY.md` and `RELEASING.md`.

## License

MIT — see `LICENSE`.
