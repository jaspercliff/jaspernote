import {defineConfig} from "vitepress";
import {nav} from "./configs/nav.js";
import {sidebar} from "./configs/sidebar.js";
import {socialLinks} from "./configs/socialLinks.js";


// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "jaspernote",
    base: "/",
    lastUpdated: true,
    ignoreDeadLinks: true,
    description: "jasper learn note",
    head: [["link", {rel: "icon", href: "/favicon.ico"}]],
    themeConfig: {
        editLink: {
            pattern: 'https://github.com/jaspercliff/jaspernote/edit/dev/docs/:path'
        },
        nav,
        sidebar,
        socialLinks,
        returnToTopLabel: '返回顶部',
        logo: "/logo.png",
        search: {
            provider: "local",
        },
        outline: {
            level: [2, 3], //显示几级标题 on this page
        },
        footer: {
            message:
                'Released under the <a href="https://github.com/jaspercliff/jaspernote?tab=License-1-ov-file">CC BY-NC-ND 4.0</a>.',
            copyright:
                'Copyright © 2024-present <a href="https://github.com/jaspercliff">jaspercliff</a>',
        },
    }
});
