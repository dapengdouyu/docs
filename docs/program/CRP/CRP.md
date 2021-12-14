# 前端性能优化 CRP

- CRP(Critlcal Rendering Path) 关键渲染路径，在关键节点上做一些优化

## 一次完整页面请求所发生的事情

1. URL

2. Dom 优先解析

@import 是同步的
link 是异步

// style 比 link 更好一点，当 style 样式不多的时候 1.真实项目中应该减少@import 阻塞渲染的请求

// 优先下载 Css HTML 请求多个
