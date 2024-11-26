import DefaultTheme from 'vitepress/theme';
import CollapsibleSidebar from '../components/CollapsibleSidebar.vue';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        // 注册折叠侧边栏组件
        app.component('CollapsibleSidebar', CollapsibleSidebar);
    }
};