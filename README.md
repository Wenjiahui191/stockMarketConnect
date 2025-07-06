# 股票信息平台（Stock Market Connect）

本项目是基于 Vue3 + Vite + Pinia + Element Plus 的股票信息展示平台，支持沪深、港股、美股、全球指数等多市场行情浏览，界面风格参考百度股市通。

## 技术栈

- [Vue 3](https://vuejs.org/) 现代渐进式前端框架
- [Vite](https://vitejs.dev/) 极速开发构建工具
- [Pinia](https://pinia.vuejs.org/) 轻量级状态管理
- [Element Plus](https://element-plus.org/) 组件库
- [TypeScript](https://www.typescriptlang.org/) 类型安全
- [Less](https://lesscss.org/) CSS 预处理

## 主要功能

- 多市场（沪深/港股/美股/全球）行情切换
- 股票列表与详情页
- 实时行情数据请求（需配置 API KEY）
- 用户信息面板、全局导航、主题样式
- 支持响应式布局和主题自定义

## 快速开始

1. 安装依赖
   ```bash
   npm install
   ```
2. 配置环境变量
   - `.env` 生产环境配置
   - `.env.development` 开发环境配置（如本地代理、API KEY）
3. 启动开发服务器
   ```bash
   npm run dev
   ```
4. 访问 [http://localhost:5173](http://localhost:5173)

## 目录结构

```
├── src/
│   ├── assets/         # 静态资源/logo/svg
│   ├── components/     # 公共组件
│   ├── hooks/          # 组合式API封装
│   ├── network/        # 网络请求与API封装
│   ├── pages/          # 页面视图
│   ├── stores/         # Pinia 状态管理
│   ├── styles/         # 全局样式与reset
│   ├── App.vue         # 根组件
│   ├── main.ts         # 入口文件
│   └── router/         # 路由配置
├── public/             # 公共资源
├── .env                # 环境变量
├── vite.config.ts      # Vite 配置
├── package.json        # 项目依赖
└── README.md           # 项目说明
```

## 注意事项

- 股票数据接口需申请 apikey，详见 `.env` 文件说明。
- 聚合数据等第三方 API 如遇跨域，请用本地代理或后端转发。
- 仅供学习交流，勿用于商业用途。

## 参考

- [百度股市通](https://gushitong.baidu.com/)
- [Element Plus 文档](https://element-plus.org/zh-CN/)
- [Vite 官方文档](https://cn.vitejs.dev/)
