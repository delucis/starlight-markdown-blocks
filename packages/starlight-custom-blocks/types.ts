interface CustomBlockVariant {
	/** The default label for this custom block variant. */
	label: string;

	/** The icon to display for this custom block variant. Can be any HTML value, e.g. an SVG string or an emoji. */
	icon?: string;

	/**
	 * The color from Starlight’s palette to use for this custom block variant.
	 * @default 'accent'
	 */
	color?: 'blue' | 'purple' | 'red' | 'orange' | 'green' | 'accent';

	/**
	 * The HTML element to use to wrap this custom block variant.
	 * @default 'div'
	 */
	element?: string;
}

export interface RemarkCustomBlocksOptions {
	/**
	 * A map of custom block variants to support.
	 *
	 * @example
	 * // This would enable a `:::idea` custom block syntax in Markdown and MDX files.
	 * variants: {
	 *   idea: {
	 *     label: 'Idea',
	 *     color: 'purple',
	 *     icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.09 2.82a8 8 0 0 0-6.68-1.66 8 8 0 0 0-6.27 6.32 8.07 8.07 0 0 0 1.72 6.65A4.54 4.54 0 0 1 7 17v3a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2.81A5.17 5.17 0 0 1 18.22 14a8 8 0 0 0-1.13-11.2ZM15 20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1h6Zm1.67-7.24A7.13 7.13 0 0 0 15 17h-2v-3a1 1 0 0 0-2 0v3H9a6.5 6.5 0 0 0-1.6-4.16 6 6 0 0 1 3.39-9.72A6 6 0 0 1 18 9a5.89 5.89 0 0 1-1.33 3.76Z"/></svg>',
	 *   }
	 * }
	 */
	variants: Record<string, CustomBlockVariant>;
}
