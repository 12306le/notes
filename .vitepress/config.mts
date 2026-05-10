import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '我的技术笔记',
  description: '一个代码小白的踩坑笔记和速查手册：Codex、Claude Code、VPS、1Panel、OpenList、Scoop、tmux 等工具的中文入门教程',

  // 部署到 GitHub Pages：仓库名是 notes，所以 base 设为 /notes/
  base: '/notes/',

  lastUpdated: true,
  cleanUrls: true,

  // 屏蔽辅助文件不被当作页面（README、CLAUDE.md、下划线开头的草稿）
  srcExclude: ['**/README.md', '**/CLAUDE.md', '**/_*.md'],

  themeConfig: {
    siteTitle: '我的技术笔记',

    nav: [
      { text: '首页', link: '/' },
      {
        text: '教程',
        items: [
          {
            text: 'Codex',
            items: [
              { text: '第三方 API 配置', link: '/codex/third-party-api' }
            ]
          },
          {
            text: 'Claude Code',
            items: [
              { text: '基本操作', link: '/claude-code/basic' },
              { text: '第三方 API 配置', link: '/claude-code/third-party-api' }
            ]
          },
          {
            text: '服务器',
            items: [
              { text: 'Ubuntu VPS 常用命令', link: '/server/ubuntu-vps' },
              { text: '1Panel 常用命令', link: '/server/1panel' },
              { text: 'OpenList 常用命令', link: '/server/openlist' }
            ]
          },
          {
            text: 'Scoop',
            items: [
              { text: '更新软件', link: '/scoop/update' },
              { text: '导入导出', link: '/scoop/export-import' },
              { text: '换机迁移', link: '/scoop/migration' }
            ]
          },
          {
            text: 'tmux',
            items: [
              { text: '基本操作', link: '/tmux/basic' },
              { text: '常用命令', link: '/tmux/commands' }
            ]
          }
        ]
      }
    ],

    sidebar: {
      '/codex/': [
        {
          text: 'Codex',
          items: [
            { text: '第三方 API 配置', link: '/codex/third-party-api' }
          ]
        }
      ],
      '/claude-code/': [
        {
          text: 'Claude Code',
          items: [
            { text: '基本操作', link: '/claude-code/basic' },
            { text: '第三方 API 配置', link: '/claude-code/third-party-api' }
          ]
        }
      ],
      '/server/': [
        {
          text: '服务器',
          items: [
            { text: 'Ubuntu VPS 常用命令', link: '/server/ubuntu-vps' },
            { text: '1Panel 常用命令', link: '/server/1panel' },
            { text: 'OpenList 常用命令', link: '/server/openlist' }
          ]
        }
      ],
      '/scoop/': [
        {
          text: 'Scoop',
          items: [
            { text: '更新软件', link: '/scoop/update' },
            { text: '导入导出', link: '/scoop/export-import' },
            { text: '换机迁移', link: '/scoop/migration' }
          ]
        }
      ],
      '/tmux/': [
        {
          text: 'tmux',
          items: [
            { text: '基本操作', link: '/tmux/basic' },
            { text: '常用命令', link: '/tmux/commands' }
          ]
        }
      ]
    },

    // socialLinks: [
    //   { icon: 'github', link: 'https://github.com/你的用户名/my-docs' }
    // ],

    footer: {
      message: '基于 MIT 协议发布',
      copyright: '© 2026 我的技术笔记'
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short',
        timeStyle: 'medium'
      }
    },

    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索文档',
            buttonAriaLabel: '搜索文档'
          },
          modal: {
            noResultsText: '无法找到相关结果',
            resetButtonTitle: '清除查询条件',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭'
            }
          }
        }
      }
    }
  }
})
