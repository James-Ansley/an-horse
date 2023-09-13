// @ts-check

// For other configuration options,
// see: https://docusaurus.io/docs/api/themes/configuration


const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

const math = require('remark-math');
const katex = require('rehype-katex');

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'An Horse Blog',
    favicon: 'img/favicon.ico',
    url: 'https://an.horse',
    baseUrl: '/blog/',

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // See: https://docusaurus.io/docs/api/themes/configuration#navbar
            navbar: {
                title: 'An Horse Blog',
                logo: {
                    alt: 'My Site Logo',
                    src: 'img/logo.svg',
                },
                items: [],
            },
            // See: https://docusaurus.io/docs/api/themes/configuration#footer-1
            footer: {
                style: 'light',
                links: [
                    {
                        label: 'GitHub',
                        href: 'https://github.com/James-Ansley/an-horse',
                    },
                    {
                        label: 'RSS',
                        href: 'https://an.horse/blog/rss.xml',
                    }
                ],
                copyright: `Copyright © ${new Date().getFullYear()} An Horse Blog. Built with Docusaurus.`,
            },
            prism: {
                theme: lightCodeTheme,
                darkTheme: darkCodeTheme,
            },
        }),

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: false,
                blog: {
                    routeBasePath: '/',
                    blogTitle: 'An Horse Blog',
                    remarkPlugins: [math],
                    rehypePlugins: [katex],
                    feedOptions: {
                        type: 'all',
                        title: 'An Horse Blog',
                        copyright: `Copyright © ${new Date().getFullYear()} An Horse Blog`,
                        createFeedItems: async (params) => {
                            const {
                                blogPosts,
                                defaultCreateFeedItems,
                                ...rest
                            } = params;
                            return defaultCreateFeedItems({
                                blogPosts: blogPosts.filter((item, index) => index < 10),
                                ...rest,
                            });
                        },
                    },
                },
                theme: {
                    customCss: [require.resolve('./src/css/custom.scss')],
                },
            }),
        ],
    ],

    themes: [
        [
            require.resolve("@easyops-cn/docusaurus-search-local"),
            /** @type {import("@easyops-cn/docusaurus-search-local").PluginOptions} */
            ({
                hashed: true,
                indexBlog: true,
                indexDocs: false,
                blogRouteBasePath: "/"
            }),
        ],
    ],

    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:
                'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    plugins: [
        'docusaurus-plugin-sass',
        async function disableUsedExports() {
            return {
                name: 'disable-used-exports',
                configureWebpack() {
                    return {
                        optimization: {
                            usedExports: false
                        }
                    }
                }
            }
        }
    ],
};

module.exports = config;
