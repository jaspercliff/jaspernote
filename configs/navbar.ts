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
      sidebarId: 'python',
      position: 'left',
      label: 'python',
    },
    { to: '/blog', label: 'Blog', position: 'right' },
    // 设计模式下拉菜单
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
    {
      href: 'https://github.com/facebook/docusaurus',
      label: 'GitHub',
      position: 'right',
    },
  ],
};
