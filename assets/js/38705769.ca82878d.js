(self.webpackChunkdapengdouyu=self.webpackChunkdapengdouyu||[]).push([[4886],{3905:function(e,n,t){"use strict";t.d(n,{Zo:function(){return l},kt:function(){return g}});var r=t(7294);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function s(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?s(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):s(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function p(e,n){if(null==e)return{};var t,r,o=function(e,n){if(null==e)return{};var t,r,o={},s=Object.keys(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||(o[t]=e[t]);return o}(e,n);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)t=s[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(o[t]=e[t])}return o}var a=r.createContext({}),c=function(e){var n=r.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},l=function(e){var n=c(e.components);return r.createElement(a.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},d=r.forwardRef((function(e,n){var t=e.components,o=e.mdxType,s=e.originalType,a=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),d=c(t),g=o,f=d["".concat(a,".").concat(g)]||d[g]||u[g]||s;return t?r.createElement(f,i(i({ref:n},l),{},{components:t})):r.createElement(f,i({ref:n},l))}));function g(e,n){var t=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var s=t.length,i=new Array(s);i[0]=d;var p={};for(var a in n)hasOwnProperty.call(n,a)&&(p[a]=n[a]);p.originalType=e,p.mdxType="string"==typeof e?e:o,i[1]=p;for(var c=2;c<s;c++)i[c]=t[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,t)}d.displayName="MDXCreateElement"},2642:function(e,n,t){"use strict";t.r(n),t.d(n,{frontMatter:function(){return p},contentTitle:function(){return a},metadata:function(){return c},toc:function(){return l},default:function(){return d}});var r=t(4034),o=t(9973),s=(t(7294),t(3905)),i=["components"],p={},a=void 0,c={unversionedId:"books/babel/29\u3001\u624b\u5199 Babel\uff1a core\u7bc7",id:"books/babel/29\u3001\u624b\u5199 Babel\uff1a core\u7bc7",isDocsHomePage:!1,title:"29\u3001\u624b\u5199 Babel\uff1a core\u7bc7",description:"core \u5305\u7684\u529f\u80fd\u662f\u4e32\u8054\u6574\u4e2a\u7f16\u8bd1\u6d41\u7a0b\uff0c\u5e76\u4e14\u5b9e\u73b0\u63d2\u4ef6\u548c preset\u3002",source:"@site/docs/books/babel/29\u3001\u624b\u5199 Babel\uff1a core\u7bc7.md",sourceDirName:"books/babel",slug:"/books/babel/29\u3001\u624b\u5199 Babel\uff1a core\u7bc7",permalink:"/docs/books/babel/29\u3001\u624b\u5199 Babel\uff1a core\u7bc7",editUrl:"https://github.com/dapengdouyu/docs/tree/master/docs/books/babel/29\u3001\u624b\u5199 Babel\uff1a core\u7bc7.md",version:"current",lastUpdatedAt:1633773412,formattedLastUpdatedAt:"10/9/2021",frontMatter:{}},l=[{value:"\u601d\u8def\u5206\u6790",id:"\u601d\u8def\u5206\u6790",children:[]},{value:"\u4ee3\u7801\u5b9e\u73b0",id:"\u4ee3\u7801\u5b9e\u73b0",children:[]},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[]}],u={toc:l};function d(e){var n=e.components,t=(0,o.Z)(e,i);return(0,s.kt)("wrapper",(0,r.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,s.kt)("p",null,"core \u5305\u7684\u529f\u80fd\u662f\u4e32\u8054\u6574\u4e2a\u7f16\u8bd1\u6d41\u7a0b\uff0c\u5e76\u4e14\u5b9e\u73b0\u63d2\u4ef6\u548c preset\u3002"),(0,s.kt)("p",null,"\u8fd9\u8282\u6211\u4eec\u6765\u5b9e\u73b0\u4e00\u4e0b core \u5305\u3002"),(0,s.kt)("h2",{id:"\u601d\u8def\u5206\u6790"},"\u601d\u8def\u5206\u6790"),(0,s.kt)("p",null,"\u524d\u9762\uff0c\u6211\u4eec\u5b9e\u73b0\u4e86 parser\u3001traverse\u3001generator \u5305\uff0c\u4f7f\u7528\u65b9\u5f0f\u662f\u8fd9\u6837\u7684\uff1a"),(0,s.kt)("p",null,"\u5206\u522b\u8c03\u7528 parse\u3001traverse\u3001generate\uff0c\u6765\u5b8c\u6210\u6e90\u7801\u7684 parse\u3001AST \u7684\u904d\u5386\u548c\u4fee\u6539\uff0c\u4ee5\u53ca\u76ee\u6807\u4ee3\u7801\u548c sourcemap \u7684\u6253\u5370\u3002"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"const sourceCode = `\nconst c = 1;\nconst d = 2;\nconst e = 4;\n\nfunction add(a, b) {\n    const tmp = 1;\n    return a + b;\n}\n\nadd(c, d);\n`;\n\nconst ast = parser.parse(sourceCode, {\n    plugins: ['literal', 'guangKeyword']\n});\n\ntraverse(ast, {\n    Program(path) {\n       Object.entries(path.scope.bindings).forEach(([id, binding]) => {\n        if (!binding.referenced) {\n            binding.path.remove();\n        }\n       });\n    }\n});\n\nconst { code, map} = generate(ast, sourceCode, 'foo.js');\nconsole.log(code);\nconsole.log(map);\n")),(0,s.kt)("p",null,"\u800c\u5982\u679c\u7528\u4e86 core \u5305\uff0c\u4f7f\u7528\u65b9\u5f0f\u662f\u8fd9\u6837\u7684\uff1a"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"function plugin1(api, options) {\n    return {\n        visitor: {\n            Program(path) {\n               Object.entries(path.scope.bindings).forEach(([id, binding]) => {\n                    if (!binding.referenced) {\n                        binding.path.remove();\n                    }\n                });\n            }\n    }\n}\nconst { code, map } = transformSync(sourceCode, {\n    parserOpts: {\n        plugins: ['literal']\n    },\n    fileName: 'foo.js',\n    plugins: [\n        [plugin1, {}]\n    ],\n    presets: []\n});\n")),(0,s.kt)("p",null,"\u53ef\u4ee5\u770b\u5230\uff0ctransformSync \u5c01\u88c5\u4e86 parse\u3001traverse\u3001generate \u7684\u903b\u8f91\uff0c\u5e76\u4e14\u8fd8\u5b9e\u73b0\u4e86\u63d2\u4ef6\u548c preset \u673a\u5236\u3002"),(0,s.kt)("p",null,"\u96c6\u6210 parse\u3001traverse\u3001generate \u6bd4\u8f83\u7b80\u5355\uff0c\u4f46\u63d2\u4ef6\u548c preset \u662f\u600e\u4e48\u5b9e\u73b0\u7684\u5462\uff1f"),(0,s.kt)("p",null,"\u63d2\u4ef6\u662f\u4e00\u4e2a\u51fd\u6570\u8fd4\u56de\u5305\u542b visitor \u7684\u5bf9\u8c61\uff0c\u6211\u4eec\u53ea\u8981\u628a\u5404\u79cd\u901a\u8fc7 options \u4f20\u5165\u7684\u63d2\u4ef6\uff0c\u5728 transformSync \u91cc\u9762\u5408\u5e76\uff0c\u4e4b\u540e\u628a\u5408\u5e76\u540e\u7684 visitors \u4f20\u5165 traverse \u65b9\u6cd5\u5c31\u53ef\u4ee5\u4e86\u3002"),(0,s.kt)("p",null,"\u800c preset \u662f\u63d2\u4ef6\u7684\u96c6\u5408\uff0c\u8c03\u7528\u51fd\u6570\u8fd4\u56de\u63d2\u4ef6\u6570\u7ec4\uff0c\u4e4b\u540e\u518d\u8c03\u7528\u63d2\u4ef6\u8fd4\u56de visitor \u7b49\uff0c\u7136\u540e visitor\uff0c\u8c03\u7528 traverse\u3002"),(0,s.kt)("p",null,"\u6b64\u5916\u8981\u6ce8\u610f\u7684\u662f babel \u63d2\u4ef6\u7684\u987a\u5e8f\u662f\u5148 plugin \u540e preset\uff0cplugin \u4ece\u524d\u5f80\u540e\u3001preset \u4ece\u540e\u5f80\u524d\u3002"),(0,s.kt)("h2",{id:"\u4ee3\u7801\u5b9e\u73b0"},"\u4ee3\u7801\u5b9e\u73b0"),(0,s.kt)("p",null,"\u9996\u5148\u6211\u4eec\u96c6\u6210 parse\u3001traverse\u3001generate 3\u6b65\uff1a"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"function transformSync(code, options) {\n    const ast = parser.parse(code, options.parserOpts);\n\n    const visitors = {};\n\n    traverse(ast, visitors);\n    return generate(ast, code, options.fileName);\n}\n")),(0,s.kt)("p",null,"\u8fd9\u91cc\u7684 visitor \u5c31\u662f\u63d2\u4ef6\u91cc\u9762 visitor \u7684\u5408\u5e76\uff0c\u6211\u4eec\u5b9e\u73b0\u4e0b\u63d2\u4ef6\u673a\u5236\uff1a"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"function transformSync(code, options) {\n    const ast = parser.parse(code, options.parserOpts);\n\n    const pluginApi = {\n        template\n    }\n    const visitors = {};\n    options.plugins && options.plugins.forEach(([plugin, options]) => {\n        const res = plugin(pluginApi, options);\n        Object.assign(visitors, res.visitor);\n    });\n\n    traverse(ast, visitors);\n    return generate(ast, code, options.fileName);\n}\n")),(0,s.kt)("p",null,"\u5176\u5b9e\u6bd4\u8f83\u7b80\u5355\uff0c\u5c31\u662f\u8c03\u7528 options \u91cc\u9762\u7684 plugin\uff0c\u4f20\u5165 options\u3001api\uff0c\u7136\u540e\u628a\u8fd4\u56de\u7684 visitor \u5408\u5e76\uff0c\u4e4b\u540e\u4f20\u5165 traverse\u3002"),(0,s.kt)("p",null,"\u800c preset \u662f\u63d2\u4ef6\u7684\u96c6\u5408\uff0c\u6240\u4ee5\u8981\u591a\u8c03\u7528\u4e00\u5c42\uff0c\u5e76\u4e14\u56e0\u4e3a\u987a\u5e8f\u662f\u4ece\u53f3\u5f80\u5de6\uff0c\u6240\u4ee5\u8981 reverse \u4e00\u4e0b\u3002"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"options.presets && options.presets.reverse().forEach(([preset, options]) => {\n    const plugins = preset(pluginApi, options);\n    plugins.forEach(([plugin, options])=> {\n        const res = plugin(pluginApi, options);\n        Object.assign(visitors, res.visitor);\n    })\n})\n")),(0,s.kt)("p",null,"\u5b8c\u6574\u4ee3\u7801\u5982\u4e0b\uff1a"),(0,s.kt)("pre",null,(0,s.kt)("code",{parentName:"pre"},"function transformSync(code, options) {\n    const ast = parser.parse(code, options.parserOpts);\n\n    const pluginApi = {\n        template\n    }\n    const visitors = {};\n    options.plugins && options.plugins.forEach(([plugin, options]) => {\n        const res = plugin(pluginApi, options);\n        Object.assign(visitors, res.visitor);\n    });\n    options.presets && options.presets.reverse().forEach(([preset, options]) => {\n        const plugins = preset(pluginApi, options);\n        plugins.forEach(([plugin, options])=> {\n            const res = plugin(pluginApi, options);\n            Object.assign(visitors, res.visitor);\n        })\n    })\n\n    traverse(ast, visitors);\n    return generate(ast, code, options.fileName);\n}\n")),(0,s.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,s.kt)("p",null,"core \u5305\u96c6\u6210\u4e86 parser\u3001traverse\u3001generator \u7b49\u5305\uff0c\u5e76\u4e14\u5b9e\u73b0\u4e86 plugin\u3001preset \u673a\u5236\u3002"),(0,s.kt)("p",null,"\u6211\u4eec\u4f1a\u628a\u63d2\u4ef6\u8fd4\u56de\u7684 visitor \u505a\u5408\u5e76\uff0c\u7136\u540e\u4f5c\u4e3a visitor \u8c03\u7528 traverse\u3002"),(0,s.kt)("p",null,"\u63d2\u4ef6\u662f\u4e00\u4e2a\u51fd\u6570\uff0c\u4f20\u5165\u53ef\u7528\u7684 api \u4ee5\u53ca\u8c03\u7528\u65f6\u4f20\u5165\u7684 options\uff0c\u8fd4\u56de visitor \u7b49\uff0c\u800c preset \u662f\u63d2\u4ef6\u7684\u96c6\u5408\uff0c\u8981\u8c03\u7528 preset \u4e4b\u540e\u62ff\u5230\u63d2\u4ef6\u96c6\u5408\uff0c\u4e4b\u540e\u518d\u8c03\u7528\u5177\u4f53\u7684\u63d2\u4ef6\uff0c\u6700\u540e\u628a\u6240\u6709 visitor \u505a\u5408\u5e76\u3002"),(0,s.kt)("p",null,"babel \u662f\u5fae\u5185\u6838\u67b6\u6784\uff0c\u5c31\u662f\u56e0\u4e3a\u6838\u5fc3\u53ea\u5b9e\u73b0\u4e86\u7f16\u8bd1\u6d41\u7a0b\uff0c\u5177\u4f53\u7684\u8f6c\u6362\u529f\u80fd\u90fd\u662f\u901a\u8fc7\u63d2\u4ef6\u6765\u5b9e\u73b0\u7684\uff0c\u800c preset \u5219\u662f\u4e3a\u4e86\u7b80\u5316\u7528\u6237\u4f7f\u7528 babel \u7684\u6210\u672c\u800c\u5f15\u5165\u7684\u4e00\u79cd\u673a\u5236\uff0c\u662f\u63d2\u4ef6\u7684\u96c6\u5408\uff0c\u8ba9\u7528\u6237\u4e0d\u9700\u8981\u76f4\u63a5\u914d\u7f6e\u5177\u4f53\u7684\u63d2\u4ef6\uff0c\u9009\u62e9\u4e0d\u540c\u7684 preset \u5373\u53ef\u3002"),(0,s.kt)("p",null,"\uff08\u4ee3\u7801\u5728",(0,s.kt)("a",{parentName:"p",href:"https://github.com/QuarkGluonPlasma/babel-plugin-exercize"},"\u8fd9\u91cc"),"\uff0c\u5efa\u8bae git clone \u4e0b\u6765\u901a\u8fc7 node \u8dd1\u4e00\u4e0b\uff09"))}d.isMDXComponent=!0}}]);