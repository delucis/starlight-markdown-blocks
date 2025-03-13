/// <reference types="mdast-util-directive" />

import { h as _h, type Properties } from 'hastscript';
import type { Node, Paragraph as P, PhrasingContent, Root } from 'mdast';
import { type Directives } from 'mdast-util-directive';
import { toString } from 'mdast-util-to-string';
import type { Transformer } from 'unified';
import { visit } from 'unist-util-visit';
import type { RemarkCustomBlocksOptions } from './types';

/** Hacky function that generates an mdast HTML tree ready for conversion to HTML by rehype. */
function h(el: string, attrs: Properties = {}, children: any[] = []): P {
	const { tagName, properties } = _h(el, attrs);
	return {
		type: 'paragraph',
		data: { hName: tagName, hProperties: properties },
		children,
	};
}

/** Checks if a node is a directive. */
function isNodeDirective(node: Node): node is Directives {
	return (
		node.type === 'textDirective' ||
		node.type === 'leafDirective' ||
		node.type === 'containerDirective'
	);
}

/**
 * remark plugin that converts blocks delimited with `:::` into styled blocks that look like
 * Starlight’s asides. Depends on the `remark-directive` module for the core parsing logic.
 */
export function remarkCustomBlocks(options: RemarkCustomBlocksOptions): Transformer<Root> {
	const builtInVariants = ['note', 'tip', 'caution', 'danger'];
	for (const key in options.variants) {
		if (builtInVariants.includes(key)) {
			throw new Error(
				`Cannot overwrite Starlight’s built-in "${key}" aside with a custom block. ` +
					`Please choose a different name in the Starlight Custom Block variants configuration.`
			);
		}
	}

	return (tree) => {
		visit(tree, (node, index, parent) => {
			if (
				!parent ||
				index === undefined ||
				!isNodeDirective(node) ||
				node.type !== 'containerDirective'
			) {
				return;
			}
			const variant = node.name;
			const variantConfig = options.variants[variant];
			if (!variantConfig) return;

			// remark-directive converts a container’s “label” to a paragraph added as the head of its
			// children with the `directiveLabel` property set to true. We want to use it as the title
			// for the block, so when we find a directive label, we store it to use later and
			// remove the paragraph from the container’s children.
			let title = variantConfig.label;
			let titleNode: PhrasingContent[] = [{ type: 'text', value: title }];
			const firstChild = node.children[0];
			if (
				firstChild?.type === 'paragraph' &&
				firstChild.data &&
				'directiveLabel' in firstChild.data &&
				firstChild.children.length > 0
			) {
				titleNode = firstChild.children;
				title = toString(firstChild.children);
				// The first paragraph contains a directive label, we can safely remove it.
				node.children.splice(0, 1);
			}

			const block = h(
				variantConfig.element || 'div',
				{
					'aria-label': title,
					class: [
						'starlight-aside',
						'starlight-custom-block',
						`starlight-custom-block--color-${variantConfig.color || 'accent'}`,
						`starlight-custom-block--${variant}`,
					].join(' '),
				},
				[
					h('p', { class: 'starlight-aside__title', 'aria-hidden': 'true' }, [
						{
							type: 'html',
							value: variantConfig.icon
								? `<span class="starlight-aside__icon">${variantConfig.icon}</span>`
								: '',
						},
						...titleNode,
					]),
					h('div', { class: 'starlight-aside__content' }, node.children),
				]
			);

			parent.children[index] = block;
		});
	};
}
