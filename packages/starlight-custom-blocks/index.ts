import type { StarlightPlugin } from '@astrojs/starlight/types';
import type { RemarkCustomBlocksOptions } from './types';
import { remarkCustomBlocks } from './remarkCustomBlocks';

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
