import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightMarkdownBlocks, { Aside } from 'starlight-markdown-blocks';

export default defineConfig({
	integrations: [
		starlight({
			editLink: {
				baseUrl: 'https://github.com/delucis/starlight-markdown-blocks/edit/main/docs/',
			},
			plugins: [
				starlightMarkdownBlocks({
					blocks: {
						question: Aside({
							label: 'Question',
							color: 'green',
							icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M17.09 2.82a8 8 0 0 0-6.68-1.66 8 8 0 0 0-6.27 6.32 8.07 8.07 0 0 0 1.72 6.65A4.54 4.54 0 0 1 7 17v3a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-2.81A5.17 5.17 0 0 1 18.22 14a8 8 0 0 0-1.13-11.2ZM15 20a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1v-1h6Zm1.67-7.24A7.13 7.13 0 0 0 15 17h-2v-3a1 1 0 0 0-2 0v3H9a6.5 6.5 0 0 0-1.6-4.16 6 6 0 0 1 3.39-9.72A6 6 0 0 1 18 9a5.89 5.89 0 0 1-1.33 3.76Z"/></svg>',
						}),
						woah: Aside({ label: 'WOAH!', color: 'accent', icon: '🤯' }),
						figure: {
							render: ({ h, label, children }) =>
								h('figure', {}, [...children, h('figcaption', {}, label)]),
						},
						delete: { render: () => [] },
					},
				}),
			],
			sidebar: [
				{
					label: 'Start Here',
					items: [{ slug: 'getting-started' }],
				},
			],
			social: {
				github: 'https://github.com/delucis/starlight-markdown-blocks',
			},
			title: 'Starlight Markdown Blocks',
		}),
	],
});
