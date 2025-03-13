import type { StarlightPlugin } from '@astrojs/starlight/types';
import type { RemarkCustomBlocksOptions } from './types';
import { remarkCustomBlocks } from './remarkCustomBlocks';

// Export built-in components.
export * from './components';

/**
 * A Starlight plugin that provides support for custom Markdown block components using the same
 * container directive syntax as Starlight’s asides.
 *
 * @example
 * plugins: [
 *   starlightCustomBlocks({
 *     blocks: {
 *       idea: Aside({ label: 'Idea', icon: '💡' }),
 *     },
 *   }),
 * ],
 */
export default function starlightCustomBlocks(options: RemarkCustomBlocksOptions): StarlightPlugin {
	return {
		name: 'starlight-custom-blocks',
		hooks: {
			'config:setup'({ config, addIntegration, updateConfig }) {
				updateConfig({
					customCss: [...(config.customCss || []), 'starlight-custom-blocks/styles.css'],
				});
				addIntegration({
					name: 'starlight-custom-blocks',
					hooks: {
						'astro:config:setup'({ updateConfig }) {
							updateConfig({
								markdown: {
									remarkPlugins: [[remarkCustomBlocks, options]],
								},
							});
						},
					},
				});
			},
		},
	};
}
