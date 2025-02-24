import {defineConfig} from 'vitepress'
import {nav} from "./configs/nav.js";
import {sidebar} from "./configs/sidebar.js";
import {socialLinks} from "./configs/socialLinks.js";
import markdownItTextualUml from 'markdown-it-textual-uml'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "jasper note",
    description: "个人开发笔记",
    base: "repo",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        nav,
        sidebar,
        socialLinks,
        editLink: {
            pattern: 'https://github.com/jaspercliff/jaspernote/edit/dev/docs/:path'
        },
        returnToTopLabel: '返回顶部',
        logo: "/logo.png",
        outline: {
            level: [2, 3], //显示几级标题 on this page
        },
        footer: {
            message:
                'Released under the <a href="https://github.com/jaspercliff/jaspernote?tab=License-1-ov-file">CC BY-NC-ND 4.0</a>.',
            copyright:
                'Copyright © 2024-present <a href="https://github.com/jaspercliff">jasperCliff</a>',
        },
        lastUpdated: {
            text: 'Updated at',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'medium'
            }
        },
        docFooter: {
            prev: 'prev page',
            next: 'next page'
        },
        search: {
            provider: 'local'
        }
    },
    markdown: {
        config: (md) => {
            md.use(markdownItTextualUml);
        }
    }
})
