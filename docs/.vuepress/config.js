module.exports = {
  title: 'rxjs-v6中文文档',
  description: 'rxjs-v6中文文档',
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], // 增加一个自定义的 favicon(网页标签的图标)
  ],
  markdown: {
    // lineNumbers: true // 代码块显示行号
  },
  themeConfig: {
    // sidebarDepth: 1,
    nav:[
      { text: 'GitHub地址', link: 'https://github.com/stormspirit055/rxjs-v6-translate' },
    ],
    sidebar:[
      {
        title: '概览',
        path: '/doc/overview/',
        children: [
          '/doc/overview/observables.md',
          '/doc/overview/observer.md',
          '/doc/overview/operators.md',
          '/doc/overview/subscription.md',
          '/doc/overview/subjects.md',
          '/doc/overview/scheduler.md',
          {
            title: 'Testing(测试)',
            collapsable: true,
            path: '/doc/overview/testing/',
            children: [
              '/doc/overview/testing/contributeTest.md',
              '/doc/overview/testing/marbleTesting.md',
            ]
          },
        ]
      }, {
        title: '引用',
        path: '/doc/reference/',
      }
    ]
  },
  plugins: [
    ['vuepress-plugin-code-copy', {
      // selector: 'div[class*="language-js extra-class"] pre',
      align: 'top',
      color: '#B7178C',
      backgroundTransition: true,
      backgroundColor: '#0075b8',
      successText: '复制成功'
    }],
  ]
}
