import type { MarkdownBlock } from './types';

interface AsideOptions {
	/** The default label for this custom aside variant. */
	label: string;

	/** The icon to display for this custom aside variant. Can be any HTML value, e.g. an SVG string or an emoji. */
	icon?: string;

	/**
	 * The color from Starlight’s palette to use for this custom aside variant.
	 * @default 'accent'
	 */
	color?: 'blue' | 'purple' | 'red' | 'orange' | 'green' | 'accent';

	/**
	 * The HTML element to use to wrap this custom aside variant.
	 * @default 'div'
	 */
	element?: string;
}

/**
 * Block component that renders HTML like Starlight’s built-in asides with support for custom
 * colors and iconography.
 *
 * @example
 * blocks: {
 *   // Add support for Starlight-style asides using `:::idea` blocks
 *   idea: Aside({ label: 'Idea', icon: '💡' }),
 * },
 */
export const Aside = ({ label, icon, color, element = 'div' }: AsideOptions): MarkdownBlock => ({
	label,

	css: ['starlight-markdown-blocks/styles.css'],

	render({ blockName, labelText, label, h, children }) {
		return h(
			element || 'div',
			{
				'aria-label': labelText,
				class: [
					'starlight-aside',
					'starlight-custom-aside',
					`starlight-custom-aside--color-${color || 'accent'}`,
					`starlight-custom-aside--${blockName}`,
				].join(' '),
			},
			[
				h('p', { class: 'starlight-aside__title', 'aria-hidden': 'true' }, [
					{ type: 'html', value: icon ? `<span class="starlight-aside__icon">${icon}</span>` : '' },
					h('span', {}, label),
				]),
				h('div', { class: 'starlight-aside__content' }, children),
			]
		);
	},
});
