import DefaultTheme from 'vitepress/theme';
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
import {useData, useRoute} from 'vitepress';
import {toRefs} from "vue";
import NavLinks from "./components/NavLinks.vue";
import Nav from "../../public/components/navigation/Nav.vue";

export default {
    ...DefaultTheme,
    enhanceApp(ctx) {
        DefaultTheme.enhanceApp(ctx);
        ctx.app.component('Nav', Nav)
        // ...
    },
    setup() {
        // 获取前言和路由
        const {frontmatter} = toRefs(useData());
        const route = useRoute();

        // 评论组件 - https://giscus.app/
        giscusTalk({
                repo: 'jaspercliff/jaspernote',
                repoId: 'R_kgDOMP__ag',
                category: 'Q&A', // 默认: `General`
                categoryId: 'DIC_kwDOMP__as4CgfD9',
                mapping: 'pathname', // 默认: `pathname`
                inputPosition: 'top', // 默认: `top`
                lang: 'zh-CN', // 默认: `zh-CN`
                // i18n 国际化设置（注意：该配置会覆盖 lang 设置的默认语言）
                // 配置为一个对象，里面为键值对组：
                // [你的 i18n 配置名称]: [对应 Giscus 中的语言包名称]
                locales: {
                    'zh-Hans': 'zh-CN',
                    'en-US': 'en'
                },
                homePageShowComment: false, // 首页是否显示评论区，默认为否
                lightTheme: 'light', // 默认: `light`
                darkTheme: 'transparent_dark', // 默认: `transparent_dark`
                // ...
            }, {
                frontmatter, route
            },
            true// 是否全部页面启动评论区。可以在页面使用 `comment: true` 前言单独启用
        );
    }
};