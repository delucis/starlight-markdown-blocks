---
title: Draft
description: Learn how to use the Starlight Markdown Blocks built-in Draft component
---

The `Draft` block type hides its contents when building your site.
This is useful for adding work-in-progress content that you can only see while running `astro dev`.

It looks like this, i.e. like nothing!

::::preview[Example]

:::draft

## WIP

Haven’t had time to finish this yet…

:::

::::

## Usage

Import `Draft` in `astro.config.mjs` and use it in the `starlightMarkdownBlocks` configuration:

```js ins={13} ins=/(Draft) /
// astro.config.mjs
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightMarkdownBlocks, { Draft } from 'starlight-markdown-blocks';

export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			plugins: [
				starlightMarkdownBlocks({
					blocks: {
						draft: Draft(),
					},
				}),
			],
		}),
	],
});
```

## Options

The `Draft` block accepts the following options.

### label

**Type:** `string`<br>
**Default:** `"Draft"`

The label to display during development to indicate draft content.
