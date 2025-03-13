---
title: Custom blocks API reference
sidebar:
  label: API reference
tableOfContents:
  maxHeadingLevel: 5
---

## Custom block objects

A custom block can specify the following properties:

### `label`

**Type:** `string`

The default label to use for this block if no label is provided in Markdown.

Users can specify a custom label inside square brackets after the block name, e.g. `:::block[Custom label]`.

### `css`

**Type:** `string[]`

An optional array of CSS files to load for this block type.
Values can be paths relative to your project root like `"./src/block-style.css"` or NPM module specifiers like `"@me/my-package/styles.css"`.

### `render()` (required)

**Type:** <code>(context: <a href="#rendercontext">RenderContext</a>) => Element | Element[]</code>

A callback function to render the markup for this block.
It receives information for the current block instance and must return an abstract syntax tree representation of the HTML to render.

Starlight Markdown Blocks uses a [remark](https://github.com/remarkjs/remark) plugin under the hood and uses the [Markdown Abstract Syntax Tree (mdast) format](https://github.com/syntax-tree/mdast) for the render function.

The following example shows a selection of what mdast nodes can look like:

```ts
const rawHtmlNode = { type: 'html', value: '<div>Example</div>' };
const textNode = { type: 'text', value: 'A plain text node' };
const paragraphNode = { type: 'paragraph', children: [textNode] };
```

Use the [`h()`](#h) utility function to simplify creating AST nodes representing HTML elements.

#### `RenderContext`

A custom block’s `render()` function will be called with a `RenderContext` object with the following properties:

##### `blockName`

**Type:** `string`

The name of the current block, e.g. `"idea"` for an `:::idea` block.

##### `labelText`

**Type:** `string`

The plain text content of the label for the current block.
This can be useful for accessible labels that don’t support rich markup or for checking that a label value is set.

##### `label`

**Type:** <code>Array&lt;<a href="https://github.com/syntax-tree/mdast?tab=readme-ov-file#phrasingcontent">PhrasingContent</a>&gt;</code>

Abstract syntax tree (AST) representing the label for the current block.
Use this AST to render the label in the correct location in your block.

The content represents the default label or a user-provided label, e.g. `"Idea"` for an `:::idea` block or `"Try this!"` for an `:::idea[Try this!]` block.

This may include inline elements for user-provided labels that include Markdown formatting, e.g.

```md
:::idea[Try the `Code` component]
```

##### `children`

**Type:** `Array<BlockContent | DefinitionContent>`

Abstract syntax tree (AST) representing the children of the current block.

##### `attributes`

**Type:** `Record<string, string | null | undefined>`

A map of any user-defined attributes added to the block in Markdown.

The directive syntax supports providing attributes in curly braces when specifying a block, for example:

```md
:::button{variant="primary" href="/page"}
Click me!
:::
```

Your render function can then decide how to use these attributes.

:::note
Specifying attributes is only supported in `.md` files.
The syntax is not compatible with MDX.
:::

##### `h()`

**Type:** `(el: string, attrs?: Properties, children?: Element[]) => Element`

A utility function for quickly creating an AST representation of an HTML element.
Use this to template the HTML for your Markdown block.

`h()` expects the following arguments:

- An HTML tag name like `"p"` or `"blockquote"`.
- An object representing attributes for this element like `{ class: "my-element" }`.
- An array of children that this element contains, which can themselves be created with `h()` or can be other mdast node types.

The following example renders a `<figure class="picture-frame">` element containing the block’s children with a caption using the user-provided label:

```js
h('figure', { class: 'picture-frame' }, [
	h('div', { class: 'picture' }, children),
	h('figcaption', {}, label),
]);
```

## Types

You can import the `MarkdownBlock` type to help write custom block objects.
This can be helpful when writing custom blocks in separate files or returning them from functions.

```ts {1} /: (MarkdownBlock)/
import type { MarkdownBlock } from 'starlight-markdown-blocks';

const ExampleBlock = (): MarkdownBlock => ({
	render: ({ h }) =>
		h('div', {}, [
			// ...
		]),
});
```
