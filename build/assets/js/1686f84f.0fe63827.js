(self.webpackChunkdapengdouyu=self.webpackChunkdapengdouyu||[]).push([[8555],{3905:function(e,r,t){"use strict";t.d(r,{Zo:function(){return p},kt:function(){return b}});var n=t(7294);function a(e,r,t){return r in e?Object.defineProperty(e,r,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[r]=t,e}function o(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);r&&(n=n.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,n)}return t}function l(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?o(Object(t),!0).forEach((function(r){a(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function c(e,r){if(null==e)return{};var t,n,a=function(e,r){if(null==e)return{};var t,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||(a[t]=e[t]);return a}(e,r);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)t=o[n],r.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=n.createContext({}),i=function(e){var r=n.useContext(s),t=r;return e&&(t="function"==typeof e?e(r):l(l({},r),e)),t},p=function(e){var r=i(e.components);return n.createElement(s.Provider,{value:r},e.children)},u={inlineCode:"code",wrapper:function(e){var r=e.children;return n.createElement(n.Fragment,{},r)}},m=n.forwardRef((function(e,r){var t=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),m=i(t),b=a,f=m["".concat(s,".").concat(b)]||m[b]||u[b]||o;return t?n.createElement(f,l(l({ref:r},p),{},{components:t})):n.createElement(f,l({ref:r},p))}));function b(e,r){var t=arguments,a=r&&r.mdxType;if("string"==typeof e||a){var o=t.length,l=new Array(o);l[0]=m;var c={};for(var s in r)hasOwnProperty.call(r,s)&&(c[s]=r[s]);c.originalType=e,c.mdxType="string"==typeof e?e:a,l[1]=c;for(var i=2;i<o;i++)l[i]=t[i];return n.createElement.apply(null,l)}return n.createElement.apply(null,t)}m.displayName="MDXCreateElement"},5429:function(e,r,t){"use strict";t.r(r),t.d(r,{frontMatter:function(){return c},contentTitle:function(){return s},metadata:function(){return i},toc:function(){return p},default:function(){return m}});var n=t(4034),a=t(9973),o=(t(7294),t(3905)),l=["components"],c={},s=void 0,i={unversionedId:"books/babel/22\u3001Babel Macros",id:"books/babel/22\u3001Babel Macros",isDocsHomePage:!1,title:"22\u3001Babel Macros",description:"babel macro \u662f\u4fee\u6539 AST \u7684\u4e00\u79cd\u65b0\u7684\u65b9\u5f0f\uff0c\u5176\u5b9e\u548c babel plugin \u5dee\u522b\u4e0d\u5927\uff0c\u4f1a\u4e86 plugin\uff0cmacro \u4e5f\u5c31\u4f1a\u4e86\u3002",source:"@site/docs/books/babel/22\u3001Babel Macros.md",sourceDirName:"books/babel",slug:"/books/babel/22\u3001Babel Macros",permalink:"/docs/books/babel/22\u3001Babel Macros",editUrl:"https://gitee.com/zhangyapeng/doc/tree/master/docs/books/babel/22\u3001Babel Macros.md",version:"current",lastUpdatedAt:1633767049,formattedLastUpdatedAt:"10/9/2021",frontMatter:{}},p=[{value:"babel macro \u4ecb\u7ecd",id:"babel-macro-\u4ecb\u7ecd",children:[]},{value:"babel macro \u5b9e\u4f8b",id:"babel-macro-\u5b9e\u4f8b",children:[]},{value:"\u4f18\u7f3a\u70b9",id:"\u4f18\u7f3a\u70b9",children:[]},{value:"\u603b\u7ed3",id:"\u603b\u7ed3",children:[]}],u={toc:p};function m(e){var r=e.components,t=(0,a.Z)(e,l);return(0,o.kt)("wrapper",(0,n.Z)({},u,t,{components:r,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"babel macro \u662f\u4fee\u6539 AST \u7684\u4e00\u79cd\u65b0\u7684\u65b9\u5f0f\uff0c\u5176\u5b9e\u548c babel plugin \u5dee\u522b\u4e0d\u5927\uff0c\u4f1a\u4e86 plugin\uff0cmacro \u4e5f\u5c31\u4f1a\u4e86\u3002"),(0,o.kt)("p",null,"\u8fd9\u8282\u6211\u4eec\u6765\u63a2\u7a76\u4e00\u4e0b babel macro\u3002"),(0,o.kt)("h2",{id:"babel-macro-\u4ecb\u7ecd"},"babel macro \u4ecb\u7ecd"),(0,o.kt)("p",null,"babel macro \u662f\u901a\u8fc7\u5728\u6e90\u7801\u4e2d\u5f15\u5165 macro \u6a21\u5757\uff0c\u5728\u8981\u8f6c\u6362\u7684\u5730\u65b9\u8c03\u7528\u76f8\u5e94\u7684 api\uff0cmacro \u5185\u90e8\u4f1a\u62ff\u5230\u76f8\u5e94\u7684 ast\uff0c\u7136\u540e\u8fdb\u884c\u8f6c\u6362\u7684\u4e00\u79cd\u65b9\u5f0f\u3002"),(0,o.kt)("p",null,"\u6bd4\u5982\u6e90\u7801\u4e3a\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"const files = require('../macros/files.macro');\n\nconsole.log('src files:');\nconsole.log(files('../src'));\nconsole.log('macro files:');\nconsole.log(files('../macros'));\n")),(0,o.kt)("p",null,"\u76ee\u6807\u4ee3\u7801\u4e3a\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'console.log(\'src files:\');\nconsole.log(["index.js", "sourceCode.js"]);\nconsole.log(\'macro files:\');\nconsole.log(["files.macro.js"]);\n')),(0,o.kt)("p",null,"\u5982\u679c\u6211\u4eec\u5199\u63d2\u4ef6\uff0c\u90a3\u4e48\u5c31\u662f\u901a\u8fc7 visitor \u627e\u5230 files \u7684\u51fd\u6570\u8c03\u7528\uff0c\u7136\u540e\u6267\u884c fs.readdirSync \u67e5\u8be2\u51fa\u6587\u4ef6\u5217\u8868\uff0c\u4e4b\u540e\u66ff\u6362\u8be5\u5904\u7684 ast \u4e3a StringLiteral \u7684\u6570\u7ec4\u3002"),(0,o.kt)("p",null,"\u90a3\u5982\u679c\u7528 macro \u600e\u4e48\u5199\u5462\uff1f"),(0,o.kt)("p",null,"\u4e5f\u662f\u4e00\u6837\u7684\u601d\u8def\uff0c\u53ea\u4e0d\u8fc7 macro \u4e0d\u9700\u8981 visitor\uff0c\u800c\u662f\u76f4\u63a5\u80fd\u627e\u5230\u8c03\u7528 macro \u7684\u5bf9\u5e94\u7684 ast\uff0c\u4e4b\u540e\u8fdb\u884c\u4fee\u6539\u3002"),(0,o.kt)("p",null,"\u4e0b\u9762\u6211\u4eec\u6765\u5b9e\u73b0\u4e00\u4e0b\u4e0a\u9762\u7684 macro\u3002"),(0,o.kt)("h2",{id:"babel-macro-\u5b9e\u4f8b"},"babel macro \u5b9e\u4f8b"),(0,o.kt)("p",null,"babel macro \u7684\u529f\u80fd\u662f\u901a\u8fc7\u63d2\u4ef6\u5b9e\u73b0\u7684\uff0c\u6240\u4ee5\u8981\u542f\u7528 macro\uff0c\u8981\u5148\u5f15\u5165 babel-plugin-macros \u63d2\u4ef6\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"const { transformFileSync } = require('@babel/core');\nconst path = require('path');\n\nconst sourceFilePath = path.resolve(__dirname, './sourceCode.js');\n\nconst { code } = transformFileSync(sourceFilePath, {\n    plugins: [\n        [\n            'babel-plugin-macros'\n        ]\n    ]\n});\n\nconsole.log(code);\n")),(0,o.kt)("p",null,"\u4e4b\u540e\uff0c\u6211\u4eec\u5728\u6e90\u7801\u4e2d\u5f15\u5165\u4e86 macro\uff0c\u7ea6\u5b9a .macro \u7ed3\u5c3e\u7684\u5c31\u662f macro\u3002"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"const files = require('../macros/files.macro');\n\nconsole.log('src files:');\nconsole.log(files('../src'));\nconsole.log('macro files:');\nconsole.log(files('../macros'));\n")),(0,o.kt)("p",null,"\u7136\u540e\u5c31\u4f1a\u8c03\u7528\u5230\u6211\u4eec\u5b9a\u4e49\u7684 macro\uff1a"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"const { createMacro } = require('babel-plugin-macros')\nconst path = require('path');\nconst fs = require('fs');\n\nfunction logMacro({ references, state, babel}) {\n  const { default: referredPaths = [] } = references;\n\n  referredPaths.forEach(referredPath => {\n    const dirPath =path.join(path.dirname(state.filename), referredPath.parentPath.get('arguments.0').node.value);\n    const fileNames = fs.readdirSync(dirPath);\n\n    const ast = babel.types.arrayExpression(fileNames.map(fileName => babel.types.stringLiteral(fileName)));\n\n    referredPath.parentPath.replaceWith(ast);\n  });\n}\n\nmodule.exports = createMacro(logMacro);\n")),(0,o.kt)("p",null,"macro \u7684\u5f62\u5f0f\u662f\u4e00\u4e2a\u51fd\u6570\uff0c\u4e4b\u540e\u8c03\u7528 createMacro \u7684 api\uff0c\u6765\u521b\u5efa macro\u3002"),(0,o.kt)("p",null,"\u5f53 babel \u7f16\u8bd1\u65f6\uff0c\u4f1a\u6267\u884c babel macro plugin \u63d2\u4ef6\uff0c\u800c\u63d2\u4ef6\u91cc\u5b9e\u73b0\u4e86\u8c03\u7528 macro \u7684\u903b\u8f91\uff0c\u5c31\u4f1a\u628a\u76f8\u5e94\u7684 ast \u4f5c\u4e3a\u53c2\u6570\u4f20\u5165\u5230 macro\uff0c\u4e5f\u5c31\u662f references \u53c2\u6570\u3002"),(0,o.kt)("p",null,"references \u53c2\u6570\u662f\u6240\u6709\u8c03\u7528\u8be5 macro \u7684 ast \u7684 path \u6570\u7ec4\uff0c\u6709\u4e86 path \u4e4b\u540e\u540e\u9762\u7684\u6211\u4eec\u5c31\u4f1a\u4e86\uff0c\u5c31\u662f\u901a\u8fc7 path \u7684 api \u8fdb\u884c ast \u7684\u589e\u5220\u6539\u3002"),(0,o.kt)("p",null,"\u8fd9\u91cc\u7684\u4fee\u6539 ast \u7684\u903b\u8f91\u5c31\u662f\u8bfb\u53d6\u76ee\u5f55\u4e0b\u7684\u6240\u6709\u6587\u4ef6\uff0c\u7136\u540e\u7528\u6587\u4ef6\u5217\u8868\u66ff\u6362 macro \u7684 ast\u3002"),(0,o.kt)("p",null,"macro \u7b2c\u4e00\u4e2a\u53c2\u6570\u6709\u4e09\u4e2a\u5c5e\u6027\uff1a"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"references\uff1a \u6240\u6709\u5f15\u7528 macro \u7684 path"),(0,o.kt)("li",{parentName:"ul"},"state\uff1a macro \u4e4b\u95f4\u4f20\u9012\u6570\u636e\u7684\u65b9\u5f0f\uff0c\u80fd\u62ff\u5230 filename"),(0,o.kt)("li",{parentName:"ul"},"babel\uff1a\u5404\u79cd api\uff0c\u548c babel plugin \u7684\u7b2c\u4e00\u4e2a\u53c2\u6570\u4e00\u6837\u3002")),(0,o.kt)("p",null,"\u8fd9\u6837\uff0c\u6211\u4eec\u5c31\u5b9e\u73b0\u4e86\u4e00\u4e2a macro\u3002"),(0,o.kt)("h2",{id:"\u4f18\u7f3a\u70b9"},"\u4f18\u7f3a\u70b9"),(0,o.kt)("p",null,"babel macro \u4f18\u70b9\u662f\u4e0d\u7528\u518d\u901a\u8fc7 visitor \u67e5\u627e ast \u4e86\uff0c\u53ea\u9700\u8981\u5728\u9700\u8981\u8f6c\u6362\u7684\u5730\u65b9\u8c03\u7528\u4e0b macro \u7684 api\uff0c\u5c31\u53ef\u4ee5\u627e\u5230\u5bf9\u5e94 ast\u3002"),(0,o.kt)("p",null,"\u4f46\u7b80\u5316\u7684\u4ee3\u4ef7\u5c31\u662f\u67e5\u627e\u5176\u4ed6 ast \u5c31\u4e0d\u662f\u90a3\u4e48\u65b9\u4fbf\u4e86\uff0c\u56e0\u4e3a\u662f\u4ece\u4e00\u4e2a\u70b9\u7684 ast \u9010\u6b65\u5411\u4e0a\u67e5\u627e\u7684\u8fc7\u7a0b\u3002"),(0,o.kt)("h2",{id:"\u603b\u7ed3"},"\u603b\u7ed3"),(0,o.kt)("p",null,"babel macro \u662f\u57fa\u4e8e babel plugin \u5c01\u88c5\u51fa\u6765\u7684\uff0c\u4e0d\u518d\u662f\u901a\u8fc7 visitor \u6765\u67e5\u627e ast\uff0c\u800c\u662f\u5728\u6e90\u7801\u8c03\u7528 macro \u7684 api\uff0c\u7136\u540e\u5728 macro \u7684\u5b9e\u73b0\u91cc\u5c31\u80fd\u62ff\u5230\u6240\u6709\u8c03\u7528 macro \u7684 path\uff0c\u4e4b\u540e\u5c31\u53ef\u4ee5\u5bf9 ast \u505a\u4fee\u6539\u4e86\u3002"),(0,o.kt)("p",null,"macro \u7684\u4f7f\u7528\u9700\u8981\u5f15\u5165 babel-plugin-macros \u6765\u542f\u7528 macro \u529f\u80fd\uff0c\u5728\u6e90\u7801\u4e2d\u5f15\u5165 .macro\u7ed3\u5c3e\u7684\u6a21\u5757\uff0c\u4e4b\u540e\u5728 macro \u5b9e\u73b0\u91cc\u9762\u8c03\u7528 crateMacro \u6765\u521b\u5efa macro\u3002"),(0,o.kt)("p",null,"macro \u4f1a\u4f20\u5165\u4e00\u4e2a\u53c2\u6570\uff0c\u5305\u542b references\u3001state\u3001babel 3\u4e2a\u5c5e\u6027\uff0c\u5206\u522b\u662f path \u6570\u7ec4\u3001macro \u4e4b\u95f4\u4f20\u9012\u6570\u636e\u7684 state\uff0c\u4ee5\u53ca\u5404\u79cd api\u3002"),(0,o.kt)("p",null,"macro \u53ea\u662f\u4e00\u79cd\u5c01\u88c5\u51fa\u6765\u7684\u65b0\u7684\u4fee\u6539 ast \u7684\u65b9\u5f0f\uff0c\u4f18\u70b9\u662f\u4e0d\u9700\u8981\u4f7f\u7528 visitor \u67e5\u627e\uff0c\u4f46\u7f3a\u70b9\u662f\u67e5\u627e\u5176\u4ed6 ast \u4e0d\u65b9\u4fbf\u3002"),(0,o.kt)("p",null,"\uff08\u4ee3\u7801\u5728",(0,o.kt)("a",{parentName:"p",href:"https://github.com/QuarkGluonPlasma/babel-plugin-exercize"},"\u8fd9\u91cc"),"\uff0c\u5efa\u8bae git clone \u4e0b\u6765\u901a\u8fc7 node \u8dd1\u4e00\u4e0b\uff09"))}m.isMDXComponent=!0}}]);