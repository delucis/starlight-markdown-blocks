---
title: Custom blocks
---

As well as built-in blocks, Starlight Markdown Blocks allows you to write custom block renderers to control the mark-up needed for your specific use case.

## Anatomy of a custom block

A custom block configuration is an object that tells the Starlight Markdown Blocks plugin how to render your block.
Custom blocks specify a render function to call for your block type and can optionally specify a default label and CSS files to load:

```js
starlightMarkdownBlocks({
	blocks: {
		example: {
			// Default label for this block.
			label: 'Example',

			// CSS files required to style this block.
			css: ['./src/example-block.css'],

			// Function that renders the HTML markup for this block.
			render: ({ h, label, children }) =>
				h('section', { class: 'example-block' }, [
					h('h1', { class: 'example-block__title' }, label),
					h('div', {}, children),
				]),
		},
	},
});
```

## Writing a render function

The render function controls the HTML markup for a custom block.
It receives the [`label`](/custom-blocks-reference/#label-1) and [`children`](/custom-blocks-reference/#children) as well as some additional [context](/custom-blocks-reference/#rendercontext) for the current block. It should return an abstract syntax tree (AST) representing the HTML for your block.

### Creating HTML elements

The render function receives a utility function [`h()`](/custom-blocks-reference/#h) that can create AST nodes representing HTML elements.

For example, this simple render function renders a `<marquee>` element containing the text “Check this out!”:

```js
render: ({ h }) => h('marquee', {}, [{ type: 'text', value: 'Check this out!' }]),
```

The function above will always render the following HTML:

```html
<marquee>Check this out!</marquee>
```

:::preview
<marquee>Check this out!</marquee>
:::

### Adding attributes

The second argument to `h()` specifies attributes to apply to the HTML element.

For example, you can tell the `<marquee>` element to alternate the direction it scrolls in:

```js ins="behavior: 'alternate'"
render: ({ h }) =>
	h('marquee', { behavior: 'alternate' }, [{ type: 'text', value: 'Check this out!' }]),
```

The function above will render the following HTML:

```html
<marquee behavior="alternate">Check this out!</marquee>
```

:::preview
<marquee behavior="alternate">Check this out!</marquee>
:::

### Rendering the block’s children

The previous example always renders the same text, but you usually want to display a block’s children somewhere in your output.

Update the previous function to use the `children` passed to `render()` instead of static text inside the `<marquee>`:

```js ins="children"
render: ({ h, children }) => h('marquee', { behavior: 'alternate' }, children),
```

Now you can use the custom block in Markdown and pass different text to each block:

```md
:::marquee
Coming Soon: Our 1998 Backstreet Boys calendar!
:::

:::marquee
Attention: This website is best viewed with Netscape Navigator
:::
```

:::preview
<marquee behavior="alternate">Coming Soon: Our 1998 Backstreet Boys calendar!</marquee>
<marquee behavior="alternate">Attention: This website is best viewed with Netscape Navigator</marquee>
:::

### Rendering the block’s label

Not every block type will need it, but you can use the label users pass to your block in your render function.
This allows users to write `:::block[Some custom label]` in Markdown and you can choose where to display the label.

Update the example to display a static label above the marquee:

```js ins=/n, (label)/ ins={2}
render: ({ h, children, label }) => [
	h('strong', {}, label),
	h('marquee', { behavior: 'alternate' }, children),
],
```

Now custom labels in Markdown will be rendered as part of the block:

```md
:::marquee[Coming Soon]
Our 1998 Backstreet Boys calendar!
:::

:::marquee[Attention]
This website is best viewed with Netscape Navigator
:::
```

:::preview
<strong>Coming Soon</strong><marquee behavior="alternate">Our 1998 Backstreet Boys calendar!</marquee>
<strong>Attention</strong><marquee behavior="alternate">This website is best viewed with Netscape Navigator</marquee>
:::
