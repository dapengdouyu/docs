const path = require("path");
const math = require("remark-math");
const katex = require("rehype-katex");

module.exports = {
   onBrokenLinks:'ignore',
  title: "Dapeng的博客",
  tagline: "记录美好生活",
  titleDelimiter: "-",
  url: "https://dapengdouyu.github.io",
  baseUrl: "/",
  favicon: "img/favicon.ico",
  themes: ["@docusaurus/theme-live-codeblock"],
  organizationName: "dapengdouyu", // Usually your GitHub org/user name.
  projectName: "docs", // Usually your repo name.
  stylesheets: [
    {
      rel: "preconnect",
      href: "https://hmcdn.baidu.com",
      type: "text/css",
    },
    {
      href: "https://cansiny.oss-cn-shanghai.aliyuncs.com/assets/fonts.css",
      type: "text/css",
      rel: "stylesheet",
    },
    {
      href: "https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css",
      type: "text/css",
      integrity:
        "sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc",
      crossorigin: "anonymous",
    },
    // {
    //   href: "react-zmage/ssr/style.css",
    // },
  ],
  themeConfig: {
    liveCodeBlock: {
      /**
       * The position of the live playground, above or under the editor
       * Possible values: "top" | "bottom"
       */
      playgroundPosition: 'bottom',
    },
    hideableSidebar: true,
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "DAPENG",
      logo: {
        alt: "DAPENG",
        src: "img/logo.jpg",
        srcDark: "img/logo.jpg",
      },
      items: [
        {
          to: "/",
          label: "博客",
          position: "right",
          items: [
            {
              label: "JavaScript",
              to: "tags/java-script",
            },
          ],
        },
        {
          label: "前端",
          position: "right",
          items: [
            {
              label: "Javascript",
              to: "docs/program/javascript/index",
            },
          ],
        },
        {
          label: "阅读",
          position: "right",
          items: [
            {
              label: "Babel 插件通关秘籍",
              to: "docs/books/Babel 插件通关秘籍/index",
            },
          ],
        },
        {
          href: "https://github.com/dapengdouyu",
          label: "github",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        // {
        //   title: 'Social',
        //   items: [
        //     {
        //       label: '博客',
        //       to: '/',
        //     },
        //     {
        //       label: 'GitHub',
        //       href: 'https://github.com/Cansiny0320',
        //     },
        //     {
        //       label: 'Bilibili 哔哩哔哩',
        //       href: 'https://space.bilibili.com/4377132',
        //     },
        //   ],
        // },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} dapeng (张亚鹏)  <a href="https://beian.miit.gov.cn/#/Integrated/index">京ICP备20028300号</a>`,
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/oceanicNext"),
      defaultLanguage: "javascript",
      additionalLanguages: ["java"],
    },
  },
  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          editUrl: "https://github.com/dapengdouyu/docs/tree/master/",
          remarkPlugins: [math],
          rehypePlugins: [katex],
          showLastUpdateTime: true,
        },
        blog: {
          path: "./blog",
          routeBasePath: "/",
          blogSidebarTitle: "近期文章",
          feedOptions: {
            type: "rss",
            title: "Dapeng's blog",  
            copyright: `Copyright © ${new Date().getFullYear()} 大鹏 (张亚鹏) Built with Docusaurus.`,
          },
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          changefreq: "daily",
          priority: 0.5,
        },
      },
    ],
  ],
  plugins: [
    path.resolve(__dirname, "./src/plugin/plugin-baidu-analytics"),
  ],
};
