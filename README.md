![logo](https://github.com/callmesoul/frontend-sniper-admin/blob/master/static/frontend-sniper.png)

# frontend-sniper-server/前端错误监控系统服务端


## 项目集
- 服务端 [frontend-sniper-server](https://github.com/callmesoul/frontend-sniper-server)
- 管理后台 [frontend-sniper-admin](https://github.com/callmesoul/frontend-sniper-admin)
- 错误探针 [frontend-sniper-explorer](https://github.com/callmesoul/frontend-sniper-explorer)

## 技术栈

 1. [egg](https://eggjs.org/zh-cn/)
 2. [sequelize](http://docs.sequelizejs.com)
 
 
 ## 环境准备
 - nodejs运行环境：建议选择 LTS 版本，最低要求 8.x。

## 使用
1. clone项目
2. `npm install` 安装依赖
3. 修改`config/config.*.js`和`database/config.json`的数据库配置并建好数据库
4. `npx sequelize db:migrate` 初始化数据库，没npx请先全局安装npx
5. 修改`config.default.js` 的email,adminHost和security白名单设置
6. `npm run dev` open http://localhost:3000/
