import starlight from '@astrojs/starlight';
import { defineConfig } from 'astro/config';
import starlightMarkdownBlocks, { Aside, Draft } from 'starlight-markdown-blocks';

export default defineConfig({
	site: 'https://delucis.github.io',
	base: '/starlight-markdown-blocks',
	integrations: [
		starlight({
			title: 'Starlight Markdown Blocks',
			social: {
				github: 'https://github.com/delucis/starlight-markdown-blocks',
			},
			editLink: {
				baseUrl: 'https://github.com/delucis/starlight-markdown-blocks/edit/main/docs/',
			},
			customCss: ['./src/styles.css'],
			plugins: [
				starlightMarkdownBlocks({
					blocks: {
						question: Aside({
							label: 'Question',
							color: 'purple',
							icon: '<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24"><path d="M11.29 15.29a1.58 1.58 0 0 0-.12.15.76.76 0 0 0-.09.18.64.64 0 0 0-.06.18 1.36 1.36 0 0 0 0 .2.84.84 0 0 0 .08.38.9.9 0 0 0 .54.54.94.94 0 0 0 .76 0 .9.9 0 0 0 .54-.54A1 1 0 0 0 13 16a1 1 0 0 0-.29-.71 1 1 0 0 0-1.42 0ZM12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Zm0-13a3 3 0 0 0-2.6 1.5 1 1 0 1 0 1.73 1A1 1 0 0 1 12 9a1 1 0 0 1 0 2 1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-.18A3 3 0 0 0 12 7Z"/></svg>',
							element: 'div',
						}),
						idea: Aside({ label: 'Idea', color: 'green', icon: '💡' }),
						figure: {
							render: ({ h, label, children }) =>
								h('figure', {}, [...children, h('figcaption', {}, label)]),
						},
						preview: {
							label: 'Preview',
							render: ({ h, label, labelText, children }) =>
								h('section', { class: 'smb-preview', 'aria-label': labelText }, [
									h('p', { class: 'smb-preview__title', 'aria-hidden': 'true' }, label),
									h('div', {}, children),
								]),
						},
						draft: Draft(),
					},
				}),
			],
			sidebar: [
				'getting-started',
				{ label: 'Built-in blocks', autogenerate: { directory: 'blocks' } },
				{ label: 'Custom blocks', items: ['custom-blocks', 'custom-blocks-reference'] },
			],
			credits: true,
			head: [
				{
					tag: 'meta',
					attrs: {
						property: 'og:image',
						content: 'https://delucis.github.io/starlight-markdown-blocks/og.png',
					},
				},
				{
					tag: 'meta',
					attrs: {
						property: 'og:image:alt',
						content:
							'Starlight Markdown Blocks: Extend Starlight’s asides syntax and render custom block types',
					},
				},
			],
		}),
	],
});
