import type { StarlightPlugin } from '@astrojs/starlight/types';
import { remarkBlocks } from './remarkBlocks';
import type { MarkdownBlocksOptions } from './types';

// Export built-in components and types.
export * from './components';
export type { MarkdownBlock } from './types';

/**
 * A Starlight plugin that provides support for custom Markdown block components using the same
 * container directive syntax as Starlight’s asides.
 *
 * @example
 * plugins: [
 *   starlightMarkdownBlocks({
 *     blocks: {
 *       idea: Aside({ label: 'Idea', icon: '💡' }),
 *     },
 *   }),
 * ],
 */
export default function starlightMarkdownBlocks(options: MarkdownBlocksOptions): StarlightPlugin {
	const cssFiles = [...new Set(Object.values(options.blocks).flatMap((block) => block.css ?? []))];

	return {
		name: 'starlight-markdown-blocks',
		hooks: {
			'config:setup'({ config, addIntegration, updateConfig }) {
				updateConfig({
					customCss: [...(config.customCss || []), ...cssFiles],
				});
				addIntegration({
					name: 'starlight-markdown-blocks',
					hooks: {
						'astro:config:setup'({ updateConfig }) {
							// @ts-ignore — When building against Astro v5, `config.markdown.processor` is not available.
							if (config.markdown?.processor && config.markdown.processor.name !== 'unified') {
								throw new Error(
									'Found incompatible Markdown processor.\n' +
										'Currently starlight-markdown-blocks only supports the unified processor.\n' +
										'See https://docs.astro.build/en/guides/markdown-content/#switching-to-the-unified-processor',
								);
							}
							updateConfig({ markdown: { remarkPlugins: [[remarkBlocks, options]] } });
						},
					},
				});
			},
		},
	};
}
