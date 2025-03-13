/// <reference types="mdast-util-directive" />

import { h as _h, type Properties } from 'hastscript';
import type { Node, Paragraph as P, PhrasingContent, Root } from 'mdast';
import type { ContainerDirective } from 'mdast-util-directive';
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

/** Checks if a node is a container directive. */
function isContainerDirective(node: Node): node is ContainerDirective {
	return node.type === 'containerDirective';
}

/**
 * remark plugin that converts blocks delimited with `:::` into styled blocks that look like
 * Starlight’s asides. Depends on the `remark-directive` module for the core parsing logic.
 */
export function remarkCustomBlocks(options: RemarkCustomBlocksOptions): Transformer<Root> {
	const builtInBlocks = ['note', 'tip', 'caution', 'danger'];
	for (const key in options.blocks) {
		if (builtInBlocks.includes(key)) {
			throw new Error(
				`Cannot overwrite Starlight’s built-in "${key}" aside with a custom block. ` +
					`Please choose a different name in the Starlight Custom Block variants configuration.`
			);
		}
	}

	return (tree) => {
		visit(tree, (node, index, parent) => {
			if (!parent || index === undefined || !isContainerDirective(node)) {
				return;
			}
			const blockName = node.name;
			const blockConfig = options.blocks[blockName];
			if (!blockConfig) return;

			// remark-directive converts a container’s “label” to a paragraph added as the head of its
			// children with the `directiveLabel` property set to true. We want to use it as the title
			// for the block, so when we find a directive label, we store it to use later and
			// remove the paragraph from the container’s children.
			let labelText = blockConfig.label ?? '';
			let label: PhrasingContent[] = [{ type: 'text', value: labelText }];
			const firstChild = node.children[0];
			if (
				firstChild?.type === 'paragraph' &&
				firstChild.data &&
				'directiveLabel' in firstChild.data &&
				firstChild.children.length > 0
			) {
				label = firstChild.children;
				labelText = toString(firstChild.children).trim();
				// The first paragraph contains a directive label, we can safely remove it.
				node.children.splice(0, 1);
			}

			const block = blockConfig.render({
				blockName,
				h,
				label,
				labelText,
				children: node.children,
				attributes: node.attributes ?? {},
			});

			parent.children.splice(index, 1, ...(Array.isArray(block) ? block : [block]));
		});
	};
}
