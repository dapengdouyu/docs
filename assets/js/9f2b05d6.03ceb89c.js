(self.webpackChunkdapengdouyu=self.webpackChunkdapengdouyu||[]).push([[8089],{3905:function(e,t,n){"use strict";n.d(t,{Zo:function(){return c},kt:function(){return m}});var l=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);t&&(l=l.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,l)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,l,o=function(e,t){if(null==e)return{};var n,l,o={},r=Object.keys(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(l=0;l<r.length;l++)n=r[l],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=l.createContext({}),u=function(e){var t=l.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},c=function(e){var t=u(e.components);return l.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return l.createElement(l.Fragment,{},t)}},k=l.forwardRef((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,p=e.parentName,c=i(e,["components","mdxType","originalType","parentName"]),k=u(n),m=o,s=k["".concat(p,".").concat(m)]||k[m]||d[m]||r;return n?l.createElement(s,a(a({ref:t},c),{},{components:n})):l.createElement(s,a({ref:t},c))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,a=new Array(r);a[0]=k;var i={};for(var p in t)hasOwnProperty.call(t,p)&&(i[p]=t[p]);i.originalType=e,i.mdxType="string"==typeof e?e:o,a[1]=i;for(var u=2;u<r;u++)a[u]=n[u];return l.createElement.apply(null,a)}return l.createElement.apply(null,n)}k.displayName="MDXCreateElement"},5440:function(e,t,n){"use strict";n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return p},metadata:function(){return u},toc:function(){return c},default:function(){return k}});var l=n(4034),o=n(9973),r=(n(7294),n(3905)),a=["components"],i={},p=void 0,u={unversionedId:"books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011",id:"books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011",isDocsHomePage:!1,title:"2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011",description:"\u5728\u5f00\u59cb\u7684\u65f6\u5019\u6211\u5c31\u5df2\u7ecf\u4fdd\u8bc1\u5168\u7a0b\u9ad8\u80fd\u5b9e\u6218\uff0c\u4f46\u4e5f\u4f1a\u6709\u4e00\u4e9b\u91cd\u8981\u7684\u7406\u8bba\u57fa\u7840\u9700\u8981\u8ba9\u5927\u5bb6\u6e05\u695a\uff0c\u6bd4\u5982 diff \u6bd4\u5bf9\u7684\u8fc7\u7a0b\u548c immutable \u7684\u4e00\u4e9b\u77e5\u8bc6\uff0c\u4e0d\u7136\u540e\u9762\u5f88\u591a\u7684\u4f18\u5316\u624b\u6bb5\u5927\u5bb6\u4f1a\u96be\u4ee5\u7406\u89e3\u3002\u6211\u5c3d\u91cf\u4ee5\u6d45\u663e\u6613\u61c2\u7684\u65b9\u5f0f\u6765\u63cf\u8ff0\uff0c\u5982\u679c\u8fd8\u6709\u4e0d\u7406\u89e3\u7684\u5730\u65b9\u5e0c\u671b\u5728\u8bc4\u8bba\u533a\u548c\u6211\u4e92\u52a8\u3002",source:"@site/docs/books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011.md",sourceDirName:"books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218",slug:"/books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011",permalink:"/docs/books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011",editUrl:"https://github.com/dapengdouyu/docs/tree/master/docs/books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/2\u3001React \u7684 Reconciliation \u7b97\u6cd5\u539f\u7406\u3010\u5f00\u5c40\u5fc5\u5907\u6846\u67b6\u539f\u7406\u3011.md",tags:[],version:"current",lastUpdatedAt:1633933712,formattedLastUpdatedAt:"10/11/2021",frontMatter:{},sidebar:"books",previous:{title:"1\u3001\u9879\u76ee\u4ecb\u7ecd\u53ca\u5c0f\u518c\u98df\u7528\u8bf4\u660e\u3010\u4e0d\u770b\u9519\u4ebf\u3011",permalink:"/docs/books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/1\u3001\u9879\u76ee\u4ecb\u7ecd\u53ca\u5c0f\u518c\u98df\u7528\u8bf4\u660e\u3010\u4e0d\u770b\u9519\u4ebf\u3011"},next:{title:"3\u3001\u4e3a\u4ec0\u4e48\u8981\u5728 React \u4e2d\u7528 Immutable \u6570\u636e\u6d41\uff1f\u3010\u5168\u7a0b\u5b9e\u6218\u6307\u5bfc\u65b9\u9488\u3011",permalink:"/docs/books/React Hooks \u4e0e Immutable \u6570\u636e\u6d41\u5b9e\u6218/3\u3001\u4e3a\u4ec0\u4e48\u8981\u5728 React \u4e2d\u7528 Immutable \u6570\u636e\u6d41\uff1f\u3010\u5168\u7a0b\u5b9e\u6218\u6307\u5bfc\u65b9\u9488\u3011"}},c=[{value:"\u5f69\u86cb: React \u865a\u62df DOM \u7684 Diff \u539f\u7406\u5168\u89e3\u6790",id:"\u5f69\u86cb-react-\u865a\u62df-dom-\u7684-diff-\u539f\u7406\u5168\u89e3\u6790",children:[{value:"\u8bbe\u8ba1\u601d\u60f3\u6982\u8ff0",id:"\u8bbe\u8ba1\u601d\u60f3\u6982\u8ff0",children:[],level:3},{value:"\u6267\u884c\u89c4\u5219 (\u6d41\u7a0b)",id:"\u6267\u884c\u89c4\u5219-\u6d41\u7a0b",children:[{value:"1\u3001\u5143\u7d20\u7c7b\u578b\u4e0d\u76f8\u540c\u65f6",id:"1\u5143\u7d20\u7c7b\u578b\u4e0d\u76f8\u540c\u65f6",children:[],level:4},{value:"2. \u5143\u7d20\u7c7b\u578b\u76f8\u540c\u65f6",id:"2-\u5143\u7d20\u7c7b\u578b\u76f8\u540c\u65f6",children:[{value:"a. \u90fd\u662f DOM \u8282\u70b9",id:"a-\u90fd\u662f-dom-\u8282\u70b9",children:[],level:5},{value:"b. \u90fd\u662f\u7ec4\u4ef6\u5143\u7d20",id:"b-\u90fd\u662f\u7ec4\u4ef6\u5143\u7d20",children:[],level:5}],level:4}],level:3},{value:"\u7279\u6b8a\u60c5\u51b5\u8ba8\u8bba\uff1a\u904d\u5386\u5b50\u5143\u7d20\u5217\u8868",id:"\u7279\u6b8a\u60c5\u51b5\u8ba8\u8bba\u904d\u5386\u5b50\u5143\u7d20\u5217\u8868",children:[{value:"\u5f15\u5165 key \u503c",id:"\u5f15\u5165-key-\u503c",children:[],level:4}],level:3}],level:2},{value:"\u9009\u53d6 key \u503c\u7684\u95ee\u9898",id:"\u9009\u53d6-key-\u503c\u7684\u95ee\u9898",children:[],level:2}],d={toc:c};function k(e){var t=e.components,n=(0,o.Z)(e,a);return(0,r.kt)("wrapper",(0,l.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,"\u5728\u5f00\u59cb\u7684\u65f6\u5019\u6211\u5c31\u5df2\u7ecf\u4fdd\u8bc1\u5168\u7a0b\u9ad8\u80fd\u5b9e\u6218\uff0c\u4f46\u4e5f\u4f1a\u6709\u4e00\u4e9b\u91cd\u8981\u7684\u7406\u8bba\u57fa\u7840\u9700\u8981\u8ba9\u5927\u5bb6\u6e05\u695a\uff0c\u6bd4\u5982 diff \u6bd4\u5bf9\u7684\u8fc7\u7a0b\u548c immutable \u7684\u4e00\u4e9b\u77e5\u8bc6\uff0c\u4e0d\u7136\u540e\u9762\u5f88\u591a\u7684\u4f18\u5316\u624b\u6bb5\u5927\u5bb6\u4f1a\u96be\u4ee5\u7406\u89e3\u3002\u6211\u5c3d\u91cf\u4ee5\u6d45\u663e\u6613\u61c2\u7684\u65b9\u5f0f\u6765\u63cf\u8ff0\uff0c\u5982\u679c\u8fd8\u6709\u4e0d\u7406\u89e3\u7684\u5730\u65b9\u5e0c\u671b\u5728\u8bc4\u8bba\u533a\u548c\u6211\u4e92\u52a8\u3002"),(0,r.kt)("p",null,'\u8fd9\u4e00\u8282\u6765\u4ecb\u7ecd React \u7684\u6e32\u67d3\u673a\u5236\u2014\u2014\u2014\u2014Reconciliation \u8fc7\u7a0b (\u5f88\u591a\u4eba\u7ffb\u8bd1\u6210 "\u4e00\u81f4\u5316\u5904\u7406\u8fc7\u7a0b"\uff0c\u4e2a\u4eba\u89c9\u5f97\u4e0d\u592a\u8d34\u5207\uff0c\u76f4\u8bd1\u4e3a "\u534f\u8c03" \u53cd\u800c\u66f4\u597d\uff0c\u4e14\u770b\u4e0b\u9762\u5206\u89e3)\u3002'),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://user-gold-cdn.xitu.io/2019/10/19/16de3834ffcc66f4?w=510&h=766&f=png&s=34039",alt:null})),(0,r.kt)("p",null,"\u5982\u4e0a\u56fe\u6240\u793a\uff0cReact \u91c7\u7528\u7684\u662f\u865a\u62df DOM (\u5373 VDOM )\uff0c\u6bcf\u6b21\u5c5e\u6027 (props) \u548c\u72b6\u6001 (state) \u53d1\u751f\u53d8\u5316\u7684\u65f6\u5019\uff0crender \u51fd\u6570\u8fd4\u56de\u4e0d\u540c\u7684\u5143\u7d20\u6811\uff0cReact \u4f1a\u68c0\u6d4b\u5f53\u524d\u8fd4\u56de\u7684\u5143\u7d20\u6811\u548c\u4e0a\u6b21\u6e32\u67d3\u7684\u5143\u7d20\u6811\u4e4b\u524d\u7684\u5dee\u5f02\uff0c\u7136\u540e\u9488\u5bf9\u5dee\u5f02\u7684\u5730\u65b9\u8fdb\u884c\u66f4\u65b0\u64cd\u4f5c\uff0c\u6700\u540e\u6e32\u67d3\u4e3a\u771f\u5b9e DOM\uff0c\u8fd9\u5c31\u662f\u6574\u4e2a Reconciliation \u8fc7\u7a0b\uff0c\u5176\u6838\u5fc3\u5c31\u662f\u8fdb\u884c\u65b0\u65e7 DOM \u6811\u5bf9\u6bd4\u7684 diff \u7b97\u6cd5\u3002"),(0,r.kt)("p",null,"\u4e3a\u4e86\u83b7\u5f97\u66f4\u4f18\u79c0\u7684\u6027\u80fd\uff0c\u9996\u5f53\u5176\u51b2\u7684\u5de5\u4f5c\u4fbf\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"\u51cf\u5c11 diff \u7684\u8fc7\u7a0b"),"\uff0c\u90a3\u4e48\u5728\u4fdd\u8bc1\u5e94\u8be5\u66f4\u65b0\u7684\u8282\u70b9\u80fd\u591f\u5f97\u5230\u66f4\u65b0\u7684\u524d\u63d0\u4e0b\uff0c\u8fd9\u4e2a diff \u7684\u8fc7\u7a0b\u5982\u4f55\u6765\u907f\u514d\u5462\uff1f"),(0,r.kt)("p",null,"\u7b54\u6848\u662f\u5229\u7528 shouldComponentUpdate \u8fd9\u4e2a\u58f0\u660e\u5468\u671f\u51fd\u6570\u3002\u8fd9\u4e2a\u51fd\u6570\u505a\u4e86\u4ec0\u4e48\u4e8b\u60c5\u5462\uff1f"),(0,r.kt)("p",null,"\u9ed8\u8ba4\u7684 shouldComponentUpdate \u4f1a\u5728 props \u548c state \u53d1\u751f\u53d8\u5316\u65f6\u8fd4\u56de true, \u8868\u793a\u7ec4\u4ef6\u4f1a\u91cd\u65b0\u6e32\u67d3\uff0c\u4ece\u800c\u8c03\u7528 render \u51fd\u6570\uff0c\u8fdb\u884c\u65b0\u65e7 DOM \u6811\u7684 diff \u6bd4\u5bf9\u3002\u4f46\u662f\u6211\u4eec\u53ef\u4ee5\u5728\u8fd9\u4e2a\u751f\u547d\u5468\u671f\u51fd\u6570\u91cc\u9762\u505a\u4e00\u4e9b\u5224\u65ad\uff0c\u7136\u540e\u8fd4\u56de\u4e00\u4e2a\u5e03\u5c14\u503c\uff0c\u5e76\u4e14\u8fd4\u56de true \u8868\u793a\u5373\u5c06\u66f4\u65b0\u5f53\u524d\u7ec4\u4ef6\uff0cfalse \u5219\u4e0d\u66f4\u65b0\u5f53\u524d\u7ec4\u4ef6\u3002\u6362\u53e5\u8bdd\u8bf4\uff0c\u6211\u4eec\u53ef\u4ee5\u901a\u8fc7 shouldComponentUpdate \u63a7\u5236\u662f\u5426\u53d1\u751f VDOM \u6811\u7684 diff \u8fc7\u7a0b\u3002"),(0,r.kt)("p",null,"\u5173\u952e\u7684\u77e5\u8bc6\u70b9\u5df2\u7ecf\u505a\u597d\u4e86\u94fa\u57ab\u3002\u73b0\u5728\u6211\u4eec\u4ee5 React \u5b98\u65b9\u7684\u4e00\u4e2a\u56fe\u4e3a\u4f8b\uff0c\u5b8c\u6574\u5730\u5206\u6790\u4e00\u4e0b Reconciliation \u7684\u6d41\u7a0b:"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://user-gold-cdn.xitu.io/2019/10/19/16de39cf997a808f?w=555&h=371&f=png&s=32167",alt:null})),(0,r.kt)("p",null,"SCU \u5373 shouldComponentUpdate \u7684\u7b80\u5199\uff0c\u56fe\u4e2d\u7684\u7ea2\u8272\u8282\u70b9\u8868\u793a shouldComponentUpdate \u51fd\u6570\u8fd4\u56de true \uff0c\u9700\u8981\u8c03\u7528 render \u65b9\u6cd5\uff0c\u8fdb\u884c\u65b0\u65e7 VDOM \u6811\u7684 diff \u8fc7\u7a0b\uff0c\u7eff\u8272\u8282\u70b9\u8868\u793a\u6b64\u51fd\u6570\u8fd4\u56de false \uff0c\u4e0d\u9700\u8981\u8fdb\u884c DOM \u6811\u7684\u66f4\u65b0\u3002"),(0,r.kt)("p",null,"\u4ece C1 \u5f00\u59cb\uff0cC1 \u4e3a\u7ea2\u8272\u8282\u70b9\uff0cshouldComponentUpdate \u8fd4\u56de true\uff0c\u9700\u8981\u8fdb\u884c\u8fdb\u4e00\u6b65\u7684\u65b0\u65e7 VDOM \u6811\u7684\u6bd4\u5bf9\uff0c\u5047\u8bbe\u73b0\u5728\u4e24\u68f5\u6811\u4e0a\u7684 C1",(0,r.kt)("inlineCode",{parentName:"p"},"\u8282\u70b9\u7c7b\u578b\u76f8\u540c"),"\uff0c\u5219\u9012\u5f52\u8fdb\u5165\u4e0b\u4e00\u5c42\u8282\u70b9\u7684\u6bd4\u8f83\uff0c\u9996\u5148\u8fdb\u5165 C2\uff0c\u7eff\u8272\u8282\u70b9\uff0c\u8868\u793a SCU \u8fd4\u56de false\uff0c",(0,r.kt)("inlineCode",{parentName:"p"},"\u4e0d\u9700\u8981\u5bf9 C2 \u7684 VDOM \u8282\u70b9\u8fdb\u884c\u6bd4\u5bf9"),"\uff0c\u540c\u65f6 ",(0,r.kt)("inlineCode",{parentName:"p"},"C2 \u4e0b\u9762\u6240\u6709\u7684\u540e\u4ee3\u8282\u70b9")," \u90fd\u4e0d\u9700\u8981\u6bd4\u5bf9\u3002"),(0,r.kt)("p",null,"\u73b0\u5728\u8fdb\u5165 C3\uff0cC3 \u4e3a\u7ea2\u8272\u8282\u70b9\uff0c\u8868\u793a SCU \u4e3a true\uff0c\u9700\u8981\u5728\u8be5\u8282\u70b9\u4e0a\u8fdb\u884c\u6bd4\u5bf9\uff0c\u5047\u8bbe\u4e24\u68f5\u6811\u7684 ",(0,r.kt)("inlineCode",{parentName:"p"},"C3 \u8282\u70b9\u7c7b\u578b\u76f8\u540c"),"\uff0c\u5219\u7ee7\u7eed\u8fdb\u5165\u5230\u4e0b\u4e00\u5c42\u7684\u6bd4\u5bf9\u4e2d\u3002\u5176 r \u4e2d C6 \u4e3a\u7ea2\u8272\u8282\u70b9\uff0c\u8fdb\u884c\u76f8\u5e94\u7684 diff \u64cd\u4f5c\uff0cC7\u3001C8 \u90fd\u4e3a\u7eff\u8272\u8282\u70b9\uff0c\u90fd\u4e0d\u9700\u8981\u66f4\u65b0\u3002"),(0,r.kt)("p",null,"\u5f53\u7136\u53ef\u80fd\u4f60\u4f1a\u6709\u7591\u95ee\uff0c\u4e0a\u9762\u90fd\u662f\u5728 diff \u7684\u65f6\u5019\u5047\u8bbe\u8282\u70b9\u7c7b\u578b\u76f8\u540c\uff0c\u90a3\u5982\u679c\u8282\u70b9\u7c7b\u578b\u4e0d\u76f8\u540c\u7684\u65f6\u5019\u4f1a\u600e\u6837\u5462\uff1f\u8fd9\u91cc React \u7684\u505a\u6cd5\u975e\u5e38\u7b80\u5355\u7c97\u66b4\uff0c\u76f4\u63a5\u5c06 ",(0,r.kt)("inlineCode",{parentName:"p"},"\u539f VDOM \u6811\u4e0a\u8be5\u8282\u70b9\u4ee5\u53ca\u8be5\u8282\u70b9\u4e0b\u6240\u6709\u7684\u540e\u4ee3\u8282\u70b9")," \u5168\u90e8\u5220\u9664\uff0c\u7136\u540e\u66ff\u6362\u4e3a\u65b0 VDOM \u6811\u4e0a\u540c\u4e00\u4f4d\u7f6e\u7684\u8282\u70b9\uff0c\u5f53\u7136\u8fd9\u4e2a\u8282\u70b9\u7684\u540e\u4ee3\u8282\u70b9\u4e5f\u5168\u90fd\u8ddf\u7740\u8fc7\u6765\u4e86\u3002\u8fd9\u5c5e\u4e8e diff \u7b97\u6cd5\u7684\u5b9e\u73b0\u7ec6\u8282\uff0c\u6211\u4eec\u5728\u6587\u672b\u7684\u5f69\u86cb\u4e2d\u4f1a\u5bf9\u4e8e diff \u66f4\u5168\u9762\u548c\u7ec6\u81f4\u7684\u62c6\u89e3\uff1a\uff09"),(0,r.kt)("p",null,"\u56e0\u6b64\u6211\u4eec\u53ef\u4ee5\u53d1\u73b0\uff0c\u5982\u679c\u80fd\u591f\u5408\u7406\u5229\u7528 shouldComponentUpdate\uff0c\u4ece\u800c\u80fd\u907f\u514d\u4e0d\u5fc5\u8981\u7684 Reconciliation \u8fc7\u7a0b\uff0c\u4f7f\u5f97\u5e94\u7528\u6027\u80fd\u53ef\u4ee5\u66f4\u52a0\u4f18\u79c0\u3002"),(0,r.kt)("p",null,"\u4e00\u822c shouldComponentUpdate \u4f1a\u6bd4\u8f83 props \u548c state \u4e2d\u7684\u5c5e\u6027\u662f\u5426\u53d1\u751f\u6539\u53d8 (\u6d45\u6bd4\u8f83) \u6765\u5224\u5b9a\u662f\u5426\u8fd4\u56de true\uff0c\u4ece\u800c\u89e6\u53d1 Reconciliation \u8fc7\u7a0b\u3002\u5178\u578b\u7684\u5e94\u7528\u5c31\u662f React \u4e2d\u63a8\u51fa\u7684 PureComponent \u8fd9\u4e2a API\uff0c\u4f1a\u5728 props \u6216\u8005 state \u6539\u53d8\u65f6\u5bf9\u4e24\u8005\u7684\u6570\u636e\u8fdb\u884c\u6d45\u5c42\u6bd4\u8f83\u3002"),(0,r.kt)("p",null,"\u4f46\u662f\u5728\u4e0a\u4e00\u5c0f\u8282\u5df2\u7ecf\u63d0\u51fa\uff0c\u8fd9\u4e2a\u9879\u76ee\u5168\u9762\u62e5\u62b1\u51fd\u6570\u5f0f\u7ec4\u4ef6\uff0c\u4e0d\u518d\u7528\u7c7b\u7ec4\u4ef6\u4e86\uff0c\u56e0\u6b64 shouldComponentUpdate \u5c31\u4e0d\u80fd\u518d\u7528\u4e86\u3002\u7528\u4e86\u51fd\u6570\u7ec4\u4ef6\u540e\uff0c\u662f\u4e0d\u662f\u5c31\u6ca1\u6709\u4e86\u6d45\u6bd4\u8f83\u7684\u65b9\u6848\u4e86\u5462\uff1f\u5e76\u4e0d\u662f\u3002React \u4e3a\u51fd\u6570\u7ec4\u4ef6\u63d0\u4f9b\u4e86\u4e00\u4e2a ",(0,r.kt)("inlineCode",{parentName:"p"},"memo")," \u65b9\u6cd5\uff0c\u5b83\u548c PureComponent \u5728\u6570\u636e\u6bd4\u5bf9\u4e0a\u552f\u4e00\u7684\u533a\u522b\u5c31\u5728\u4e8e ",(0,r.kt)("inlineCode",{parentName:"p"},"\u53ea\u8fdb\u884c\u4e86 props \u7684\u6d45\u6bd4\u8f83"),"\uff0c\u56e0\u4e3a\u51fd\u6570\u7ec4\u4ef6\u662f\u6ca1\u6709 state \u7684\u3002\u800c\u4e14\u5b83\u7684\u7528\u6cd5\u5f88\u7b80\u5355\uff0c\u76f4\u63a5\u5c06\u51fd\u6570\u4f20\u5165 memo \u4e2d\u5bfc\u51fa\u5373\u53ef\u3002\u5f62\u5982:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"function Home () {\n    //xxx\n} \nexport default memo (Home);\n\n")),(0,r.kt)("p",null,"\u8fd9\u4e5f\u5c31\u89e3\u91ca\u4e86\u4e3a\u4ec0\u4e48\u6211\u4eec\u9700\u8981\u7528\u5728\u6bcf\u4e2a\u7ec4\u4ef6\u5bfc\u51fa\u65f6\u90fd\u8981\u52a0 memo \u5305\u88f9\u3002"),(0,r.kt)("h2",{id:"\u5f69\u86cb-react-\u865a\u62df-dom-\u7684-diff-\u539f\u7406\u5168\u89e3\u6790"},"\u5f69\u86cb: React \u865a\u62df DOM \u7684 Diff \u539f\u7406\u5168\u89e3\u6790"),(0,r.kt)("p",null,"\u8c08\u5230 React,diff \u7b97\u6cd5\u51e0\u4e4e\u662f\u4e00\u4e2a\u907f\u4e0d\u5f00\u7684\u8bdd\u9898\uff0c\u56e0\u4e3a\u5b83\u5bf9\u4e8e\u5e94\u7528\u6027\u80fd\u6765\u8bf4\u5b9e\u5728\u975e\u5e38\u91cd\u8981\uff0c\u4f46\u672c\u5c0f\u8282\u7684\u4e3b\u89d2\u662f shouldComponentUpdate, \u56e0\u6b64\u5728\u6b63\u6587\u53ea\u662f\u6709\u6240\u63d0\u53ca\uff0c\u73b0\u5728\u5728\u5f69\u86cb\u90e8\u5206\u6211\u4eec\u5c31\u6765\u5f7b\u5e95\u5730\u6574\u7406\u4e00\u4e0b React \u865a\u62df DOM \u7684 diff \u7b97\u6cd5\u7a76\u7adf\u662f\u5982\u4f55\u505a\u7684\u3002\u5176\u5b9e\u6574\u4e2a\u8fc7\u7a0b\u5e76\u4e0d\u96be\uff0c\u96be\u7684\u662f\u5b83\u7684\u6e90\u7801\u5bf9\u4e8e\u8fb9\u754c\u60c5\u51b5\u548c\u5176\u4ed6\u7ec6\u8282\u7684\u5904\u7406\uff0c\u4f46\u7cbe\u901a\u6e90\u7801\uff0c\u90a3\u662f\u53c2\u4e0e React \u6846\u67b6\u5f00\u53d1\u7684\u4eba\u8981\u505a\u7684\uff0c\u6211\u4eec\u8981\u505a\u7684\u53ea\u662f\u660e\u767d\u5176\u4e2d\u7684\u539f\u7406\uff0c\u4ee5\u6b64\u6765\u5e2e\u52a9\u6211\u4eec\u7684\u5e94\u7528\u5f00\u53d1\u3002"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u601d\u7ef4\u56fe (\u5efa\u8bae\u6536\u85cf)\uff1a")),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://user-gold-cdn.xitu.io/2019/10/19/16de41554a3ff3e2?w=1431&h=610&f=png&s=93408",alt:null})),(0,r.kt)("p",null,"\u63a5\u4e0b\u6765\u4e00\u4e00\u5730\u5bf9\u5176\u4e2d\u7684\u8fc7\u7a0b\u8fdb\u884c\u62c6\u89e3\u3002"),(0,r.kt)("h3",{id:"\u8bbe\u8ba1\u601d\u60f3\u6982\u8ff0"},"\u8bbe\u8ba1\u601d\u60f3\u6982\u8ff0"),(0,r.kt)("p",null,"\u9996\u5148\u662f\u8bbe\u8ba1\u601d\u60f3\uff0c\u5176\u5b9e\u4ece\u4e00\u4e2a\u6811\u53c2\u7167\u53e6\u4e00\u68f5\u6811\u8fdb\u884c\u66f4\u65b0\uff0c\u5982\u679c\u5229\u7528\u5faa\u73af\u9012\u5f52\u7684\u65b9\u5f0f\u5bf9\u6bcf\u4e00\u4e2a\u8282\u70b9\u8fdb\u884c\u6bd4\u8f83\uff0c\u90a3\u7b97\u6cd5\u7684\u590d\u6742\u5ea6\u53ef\u4ee5\u5230\u8fbe\u662f O (n^3), \u901a\u4fd7\u70b9\u6765\u8bf4 1000 \u4e2a\u8282\u70b9\u7684\u6811\uff0c\u8981\u6bd4\u5bf9 10 \u4ebf\u6b21\uff0c\u8fd8\u4e0d\u5305\u62ec\u6bd4\u5bf9\u7c7b\u578b\u3001\u5c5e\u6027\u7b49\u7b49\u8282\u70b9\u7684\u7ec6\u8282\uff0c\u5373\u4f7f\u76ee\u524d\u6027\u80fd\u6700\u9ad8\u7684 CPU \u4e5f\u5f88\u96be\u518d\u4e00\u79d2\u5185\u7b97\u51fa\u7ed3\u679c\u3002"),(0,r.kt)("p",null,"\u4f46\u662f React \u8bf4\u5b83\u7684 diff \u5c31\u662f\u80fd\u8fbe\u5230 O (n) \u7ea7\u522b\u3002"),(0,r.kt)("p",null,"\u4e0d\u53ef\u601d\u8bae\u5427\uff01\u4f46\u5b83\u5176\u5b9e\u5c31\u662f\u5077\u5de5\u51cf\u6599\uff0c\u5e76\u6ca1\u6709\u8001\u8001\u5b9e\u5b9e\u5730\u6bd4\u5bf9\u6bcf\u4e00\u4e2a\u8282\u70b9\uff0c\u6709\u4e00\u5957\u81ea\u5df1\u7684\u65b9\u6cd5\u8bba\uff0c\u7b80\u5355\u7684\u5f52\u7eb3\u4e00\u4e0b\u5c31\u662f\u4e0b\u9762\u4e09\u6761:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"\u6c38\u8fdc\u53ea\u6bd4\u8f83\u540c\u5c42\u8282\u70b9\uff0c\u4e0d\u4f1a\u8de8\u5c42\u7ea7\u6bd4\u8f83\u8282\u70b9\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u4e0d\u540c\u7684\u4e24\u4e2a\u8282\u70b9\u4ea7\u751f\u4e0d\u540c\u7684\u6811\u3002\u8fd9\u4e5f\u5c31\u662f\u4e0a\u9762\u603b\u7ed3\u7684\u7c7b\u578b\u4e0d\u76f8\u540c\u7684\u60c5\u51b5\uff0c\u628a\u539f\u6765\u7684\u8282\u70b9\u4ee5\u53ca\u5b83\u7684\u540e\u4ee3\u5168\u90e8\u5e72\u6389\uff0c\u66ff\u6362\u6210\u65b0\u7684\u3002"),(0,r.kt)("li",{parentName:"ol"},"\u901a\u8fc7 key \u503c\u6307\u5b9a\u54ea\u4e9b\u5143\u7d20\u662f\u76f8\u540c\u7684\u3002(\u540e\u9762\u6765\u5c55\u5f00\u4ecb\u7ecd\u3002)")),(0,r.kt)("h3",{id:"\u6267\u884c\u89c4\u5219-\u6d41\u7a0b"},"\u6267\u884c\u89c4\u5219 (\u6d41\u7a0b)"),(0,r.kt)("h4",{id:"1\u5143\u7d20\u7c7b\u578b\u4e0d\u76f8\u540c\u65f6"},"1\u3001\u5143\u7d20\u7c7b\u578b\u4e0d\u76f8\u540c\u65f6"),(0,r.kt)("p",null,"\u89c1\u4e0a\u6587\u5206\u6790\u3002"),(0,r.kt)("h4",{id:"2-\u5143\u7d20\u7c7b\u578b\u76f8\u540c\u65f6"},"2","."," \u5143\u7d20\u7c7b\u578b\u76f8\u540c\u65f6"),(0,r.kt)("h5",{id:"a-\u90fd\u662f-dom-\u8282\u70b9"},"a. \u90fd\u662f DOM \u8282\u70b9"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'<div className="old" title="\u8001\u8282\u70b9" />\n\n<div className="new" title="\u65b0\u8282\u70b9" />\n\n')),(0,r.kt)("p",null,"\u901a\u8fc7\u6bd4\u5bf9\u8fd9\u4e24\u4e2a\u5143\u7d20\uff0cReact \u77e5\u9053\u9700\u8981\u4fee\u6539 DOM \u5143\u7d20\u4e0a\u7684 className \u5c5e\u6027\u548c title \u5c5e\u6027\u3002"),(0,r.kt)("p",null,"\u5904\u7406\u5b8c\u8be5\u8282\u70b9\u540e\uff0cReact \u7ee7\u7eed\u5bf9\u5b50\u8282\u70b9\u8fdb\u884c\u9012\u5f52\u3002"),(0,r.kt)("h5",{id:"b-\u90fd\u662f\u7ec4\u4ef6\u5143\u7d20"},"b. \u90fd\u662f\u7ec4\u4ef6\u5143\u7d20"),(0,r.kt)("p",null,"\u7ec4\u4ef6\u5b9e\u4f8b\u4fdd\u6301\u4e0d\u53d8\uff0c\u66f4\u65b0 props\u3002\u503c\u5f97\u6ce8\u610f\u7684\u662f\uff0c\u8fd9\u65f6\u5019\u8c03\u7528\u7ec4\u4ef6\u5b9e\u4f8b\u7684 componentWillReceiveProps () \u65b9\u6cd5\u3002\u7136\u540e\u901a\u8fc7 shouldComponentUpdate \u8fd4\u56de\u503c\u51b3\u5b9a\u662f\u5426\u8c03\u7528 render \u65b9\u6cd5\u3002"),(0,r.kt)("p",null,"\u5904\u7406\u5b8c\u8be5\u8282\u70b9\u540e\uff0c\u4f9d\u7136\u7ee7\u7eed\u5bf9\u5b50\u8282\u70b9\u8fdb\u884c\u9012\u5f52\u3002"),(0,r.kt)("h3",{id:"\u7279\u6b8a\u60c5\u51b5\u8ba8\u8bba\u904d\u5386\u5b50\u5143\u7d20\u5217\u8868"},"\u7279\u6b8a\u60c5\u51b5\u8ba8\u8bba\uff1a\u904d\u5386\u5b50\u5143\u7d20\u5217\u8868"),(0,r.kt)("h4",{id:"\u5f15\u5165-key-\u503c"},"\u5f15\u5165 key \u503c"),(0,r.kt)("p",null,"\u9996\u5148\uff0c\u6211\u4eec\u5f80\u5217\u8868\u672b\u5c3e\u63d2\u5165\u4e00\u4e2a\u5143\u7d20:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<ul>\n  <li>1</li>\n  <li>2</li>\n</ul>\n\n")),(0,r.kt)("p",null,"\u63d2\u5165\u540e\u4e3a:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<ul>\n  <li>1</li>\n  <li>2</li>\n  <li>3</li>\n</ul>\n\n")),(0,r.kt)("p",null,"React \u4f1a\u5148\u5339\u914d\u4e24\u4e2a\u5bf9\u5e94\u7684\u6811\uff0c\u6700\u540e\u63d2\u5165\u7b2c\u4e09\u4e2a\u5143\u7d20\uff0c\u6ca1\u6709\u4efb\u4f55\u95ee\u9898\u3002"),(0,r.kt)("p",null,"\u4f46\u662f\u5982\u679c\u5728\u5934\u90e8\u63d2\u5165\u5462\uff1f"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},"<ul>\n  <li>3</li>\n  <li>1</li>\n  <li>2</li>\n</ul>\n\n")),(0,r.kt)("p",null,"\u6b64\u65f6\u524d\u4e24\u4e2a\u5143\u7d20\u548c\u539f\u6765\u90fd\u4e0d\u4e00\u6837\uff0c\u7b2c\u4e09\u4e2a\u5143\u7d20\u88ab\u5f53\u4f5c\u65b0\u589e\u7684\u8282\u70b9\uff0c\u660e\u660e\u53ea\u9700\u8981\u66f4\u65b0 1 \u4e2a\u8282\u70b9\uff0c\u73b0\u5728\u66f4\u65b0\u4e86 3 \u4e2a\u3002\u8fd9\u6837\u7684\u60c5\u51b5\u6548\u7387\u662f\u975e\u5e38\u4f4e\u7684\u3002"),(0,r.kt)("p",null,"\u4e8e\u662f\uff0cReact \u5f15\u5165\u4e86 key \u503c\u7684\u6982\u5ff5\u3002"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'<ul>\n  <li key="first">1</li>\n  <li key="second">2</li>\n</ul>\n\n')),(0,r.kt)("p",null,"\u63d2\u5165\u4e4b\u540e\u53d8\u4e3a:"),(0,r.kt)("pre",null,(0,r.kt)("code",{parentName:"pre"},'<ul>\n  <li key="third">3</li>\n  <li key="first">1</li>\n  <li key="second">2</li>\n</ul>\n\n')),(0,r.kt)("p",null,"\u73b0\u5728 React \u901a\u8fc7 key \u5f97\u77e5 1 \u548c 2 \u539f\u6765\u662f\u5b58\u5728\u7684\uff0c\u73b0\u5728\u53ea\u662f\u6362\u4e86\u4f4d\u7f6e\uff0c\u56e0\u6b64\u4e0d\u9700\u8981\u66f4\u65b0\u6574\u4e2a\u8282\u70b9\u4e86\uff0c\u53ea\u9700\u8981\u79fb\u52a8\u4f4d\u7f6e\u5373\u53ef\uff0c\u5927\u5927\u63d0\u5347\u6548\u7387\u3002"),(0,r.kt)("h2",{id:"\u9009\u53d6-key-\u503c\u7684\u95ee\u9898"},"\u9009\u53d6 key \u503c\u7684\u95ee\u9898"),(0,r.kt)("p",null,"key \u9009\u53d6\u7684\u539f\u4e00\u822c\u662f ",(0,r.kt)("inlineCode",{parentName:"p"},"\u4e0d\u9700\u8981\u5168\u5c40\u552f\u4e00\uff0c\u4f46\u5fc5\u987b\u5217\u8868\u4e2d\u4fdd\u6301\u552f\u4e00"),"\u3002"),(0,r.kt)("p",null,"\u6709\u5f88\u591a\u4eba\u559c\u6b22\u7528\u6570\u7ec4\u5143\u7d20\u7684\u4e0b\u6807\u4f5c\u4e3a key \u503c\uff0c\u5728\u5143\u7d20\u987a\u5e8f\u4e0d\u6539\u53d8\u7684\u60c5\u51b5\u662f\u6ca1\u6709\u95ee\u9898\u7684\uff0c\u4f46\u4e00\u65e6\u987a\u5e8f\u53d1\u751f\u6539\u53d8\uff0cdiff \u6548\u7387\u5c31\u6709\u53ef\u80fd\u9aa4\u7136\u4e0b\u964d\u3002"),(0,r.kt)("p",null,"\u4e3e\u4e2a\u4f8b\u5b50\uff0c\u73b0\u5728\u5728\u4e94\u4e2a\u5143\u7d20\u4e2d\u63d2\u5165 F"),(0,r.kt)("p",null,(0,r.kt)("img",{parentName:"p",src:"https://user-gold-cdn.xitu.io/2019/10/19/16de474300409e90?w=642&h=300&f=png&s=14240",alt:null})),(0,r.kt)("p",null,"\u73b0\u5728\u7531\u4e8e F \u7684\u63d2\u5165\uff0c\u540e\u9762\u7684 C\u3001D\u3001E \u7d22\u5f15\u503c\u90fd\u6539\u53d8\uff0c\u5373 key \u503c\u6539\u53d8\uff0c\u56e0\u6b64\u540e\u9762\u7684\u8282\u70b9\u90fd\u5f97\u66f4\u65b0\u3002\u800c\u4e14\uff0c\u6570\u7ec4\u4e71\u5e8f\u6216\u8005\u5728\u5934\u90e8\u63d2\u5165\u90fd\u4f1a\u5bfc\u81f4\u540c\u6837\u7684\u66f4\u65b0\u95ee\u9898\u3002"),(0,r.kt)("blockquote",null,(0,r.kt)("p",{parentName:"blockquote"},"\u56e0\u6b64\uff0c\u4e0d\u7528\u6570\u7ec4\u7d22\u5f15\u505a key \u503c\u7684\u6839\u672c\u539f\u56e0\u5728\u4e8e\uff1a\u6570\u7ec4\u4e0b\u6807\u503c\u4e0d\u7a33\u5b9a\uff0c\u4fee\u6539\u987a\u5e8f\u4f1a\u4fee\u6539\u5f53\u524d key")),(0,r.kt)("p",null,"\u5f53\u6211\u4eec\u5229\u7528 key \u503c\u4ee5\u540e\uff0c\u4e0a\u9762\u7684\u95ee\u9898\u4fbf\u8fce\u5203\u800c\u89e3\uff0c\u540e\u9762\u7684 C\u3001D\u3001E \u53ea\u9700\u8981\u5411\u540e\u632a\u52a8\u4e00\u4e2a\u4f4d\u7f6e\u5373\u53ef\uff0c\u771f\u6b63\u9700\u8981\u66f4\u65b0\u7684\u5c31\u53ea\u6709\u65b0\u589e\u7684\u8282\u70b9\u4e86\u3002"),(0,r.kt)("p",null,"\u597d\u4e86\uff0cReact \u4e2d\u7684 diff \u7b97\u6cd5\u5148\u5206\u4eab\u5230\u8fd9\u91cc\uff0c\u5e0c\u671b\u8fd9\u4e00\u5c0f\u8282\u5bf9\u4f60\u6709\u6240\u542f\u53d1\u3002"))}k.isMDXComponent=!0}}]);