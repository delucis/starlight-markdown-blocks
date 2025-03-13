---
title: Aside
---

The `Aside` block type renders an aside (also known as “callout” or “admonition”) in the same style as Starlight’s built-in asides.

::::preview[Example]

:::idea
This is a custom aside style.
:::

:::question
How many stars in the Andromeda constellation have planets?
:::

::::

## Usage

Import `Aside` in `astro.config.mjs` and use it in the `starlightMarkdownBlocks` configuration:

```js ins={13} ins=/(Aside) /
// astro.config.mjs
import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightMarkdownBlocks, { Aside } from 'starlight-markdown-blocks';

export default defineConfig({
	integrations: [
		starlight({
			title: 'My Docs',
			plugins: [
				starlightMarkdownBlocks({
					blocks: {
						idea: Aside({ label: 'Idea', color: 'green', icon: '💡' }),
					},
				}),
			],
		}),
	],
});
```

## Options

The `Aside` block accepts the following options.

### `label` (required)

**Type:** `string`

The default label that will be shown when your block is used without a custom label.

For example, an `:::idea` block might have a default label of `"Idea"`.
You can override this default in your Markdown content by specifying a custom label for that instance, e.g. `:::idea[Custom label]`.

### `color`

**Type:** `"blue" | "purple" | "red" | "orange" | "green" | "accent"`<br>
**Default:** `"accent"`

The color from Starlight’s palette to use for the aside’s border, background, and heading text color.
Defaults to the current theme’s accent color.

### `icon`

**Type:** `string`

The icon to display in the aside’s heading.
This can be any HTML content.
For example, you can provide an SVG or use an emoji.

```js
// Aside using an emoji as its icon
Aside({ label: 'Woah!', icon: '🤯' }),

// Aside using an SVG as its icon
Aside({
	label: 'Question',
	icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M11.29 15.29a1.58 1.58 0 0 0-.12.15.76.76 0 0 0-.09.18.64.64 0 0 0-.06.18 1.36 1.36 0 0 0 0 .2.84.84 0 0 0 .08.38.9.9 0 0 0 .54.54.94.94 0 0 0 .76 0 .9.9 0 0 0 .54-.54A1 1 0 0 0 13 16a1 1 0 0 0-.29-.71 1 1 0 0 0-1.42 0ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-13a3 3 0 0 0-2.6 1.5 1 1 0 1 0 1.73 1A1 1 0 0 1 12 9a1 1 0 0 1 0 2 1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-.18A3 3 0 0 0 12 7Z"/></svg>',
}),
```

:::tip
If providing an SVG, use `currentColor` for its fill or stroke attributes if it should match the surrounding text color.
:::

### `element`

**Type:** `string`<br>
**Default:** `"aside"`

The HTML element to use as the wrapper for the aside.

By default, an `<aside>` element is used to match Starlight’s built-in asides.
However, an `<aside>` implies that the block’s content is complementary or secondary information, so you could choose to specify a different element if it is more appropriate for your callout type.
