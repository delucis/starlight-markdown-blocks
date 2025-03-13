import type { Properties } from 'hastscript';
import type {
	BlockContent,
	DefinitionContent,
	ListItem,
	PhrasingContent,
	RootContent,
	TableCell,
	TableRow,
} from 'mdast';
import type { ContainerDirective } from 'mdast-util-directive';

type Element =
	| PhrasingContent
	| BlockContent
	| DefinitionContent
	| RootContent
	| ListItem
	| TableRow
	| TableCell;

export interface MarkdownBlock {
	label?: string | undefined;

	css?: string[];

	render(options: {
		/** The name of the current block, e.g. `idea` for an `:::idea` block. */
		blockName: string;

		/**
		 * The plain text content of the  label for the current block.
		 */
		labelText: string | undefined;

		/**
		 * An AST of the label for the current block.
		 *
		 * The content can be the default label or a user-provided label, e.g. `"Idea"` for an `:::idea`
		 * block or `"Try this!"` for an `:::idea[Try this!]` block.
		 *
		 * This may include inline elements for user-provided labels that include Markdown formatting,
		 * e.g.
		 * ```md
		 * :::idea[Try the `Code` component]
		 * ```
		 */
		label: PhrasingContent[];

		/**
		 * AST representing the children of the current block.
		 */
		children: ContainerDirective['children'];

		/** User-defined attributes for this directive like `class` or `id`. */
		attributes: NonNullable<ContainerDirective['attributes']>;

		/**
		 * A utility for quickly creating an AST representation of an HTML element.
		 * Use this to template the HTML for your Markdown block.
		 *
		 * @example
		 * // Render <figure class="picture-frame"> with the block’s children and a caption.
		 * h('figure', { class: 'picture-frame' }, [
		 *   ...children,
		 *   h('figcaption', {}, label);
		 * ]);
		 */
		h(el: string, attrs?: Properties, children?: Element[]): Element;
	}): Element | Element[];
}

export interface RemarkCustomBlocksOptions {
	/**
	 * A map of custom block variants to support.
	 *
	 * @example
	 * // This would enable a `:::idea` custom block syntax in Markdown and MDX files.
	 * blocks: {
	 *   idea: {
	 *     label: 'Idea',
	 *     // render <div class="idea"><h2>{label}</h2>...</div>
	 *     render: ({ h, label, children }) => h('div', { class: 'idea' }, [
	 *       h('h2', {}, label),
	 *       ...children,
	 *     ]),
	 *   },
	 * },
	 */
	blocks: Record<string, MarkdownBlock>;
}
