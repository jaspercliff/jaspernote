// navbar.ts
import { ThemeConfig } from '@docusaurus/preset-classic';

// 定义并导出 navbar 对象
export const navbar: ThemeConfig['navbar'] = {
  title: 'My Site',
  logo: {
    alt: 'My Site Logo',
    src: 'img/logo.svg',
  },
  items: [
    {
      type: 'docSidebar',
      sidebarId: 'patterns',
      position: 'left',
      label: '设计模式',
    },
    {
      type: 'docSidebar',
      sidebarId: 'dataStructure',
      position: 'left',
      label: '数据结构',
    },
    {
      type: 'docSidebar',
      sidebarId: 'kotlin',
      position: 'left',
      label: 'kotlin',
    },
    {
      type: 'docSidebar',
      sidebarId: 'python',
      position: 'left',
      label: 'python',
    },
    {
      type: 'docSidebar',
      sidebarId: 'lua',
      position: 'left',
      label: 'lua',
    },
    {
      type: 'dropdown',
      label: 'front',
      position: 'left',
      items: [
        { label: 'html', to: '/docs/front/html', sidebarId: 'html' },
        { label: 'css', to: '/docs/front/css', sidebarId: 'css' },
        { label: 'js', to: '/docs/front/js', sidebarId: 'js' },
        { label: 'jquery', to: '/docs/front/jquery', sidebarId: 'jquery' },
        { label: 'vitepress', to: '/docs/front/vitepress', sidebarId: 'vitepress' },
        { label: 'docusaurus', to: '/docs/front/docusaurus', sidebarId: 'docusaurus' },
        { label: 'vue', to: '/docs/front/vue', sidebarId: 'vue' },
        { label: 'react', to: '/docs/front/react', sidebarId: 'react' },
      ],
    },
    //================================================ dataLayer
    {
      type: 'dropdown',
      label: 'dataLayer',
      position: 'left',
      items: [
        { label: '关系型数据库', to: '/docs/dataLayer/relational/', sidebarId: 'relational' },
        { label: '分布式数据库', to: '/docs/dataLayer/distributed/', sidebarId: 'distributed' },
        { label: 'NoSQL', to: '/docs/dataLayer/nosql/', sidebarId: 'nosql' },
        { label: '连接池', to: '/docs/dataLayer/connectPool/', sidebarId: 'connectPool' },
        { label: '分库分表', to: '/docs/dataLayer/sharding/', sidebarId: 'sharding' },
      ],
    },
    //================================================ system design
    {
      type: 'dropdown',
      label: 'system design',
      position: 'left',
      items: [
        { label: 'operating system', to: '/docs/infrastructure/os', sidebarId: 'os' },
        { label: 'system design', to: '/docs/infrastructure/design', sidebarId: 'design' },
        { label: 'devops', to: '/docs/infrastructure/devops', sidebarId: 'devops' },
      ],
    },
    //================================================ utils
    {
      type: 'dropdown',
      label: 'utils',
      position: 'left',
      items: [
        { label: 'git', to: '/docs/utils/git', sidebarId: 'dataStructure' },
        { label: 'svn', to: '/docs/utils/svn', sidebarId: 'svn' },
        { label: 'vim', to: '/docs/utils/vim', sidebarId: 'vim' },
        { label: 'neovim', to: '/docs/utils/neovim', sidebarId: 'neovim' },
        { label: 'jmeter', to: '/docs/utils/jmeter', sidebarId: 'jmeter' },
      ],
    },
    {
      to: '/docs/tags',
      label: '标签云',
      position: 'right',
    },
    { to: '/blog', label: 'Blog', position: 'right' },
    {
      href: 'https://github.com/facebook/docusaurus',
      label: 'GitHub',
      position: 'right',
    },
  ],
};
