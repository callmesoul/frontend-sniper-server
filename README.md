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
4. `npx sequelize db:migrate` 初始化数据库，没npx请先全局安装npx,部署生产环境时加` --env=production` 使用生成环境配置
4. `npx sequelize db:seed:all` 初始化数据库数据，没npx请先全局安装npx,部署生产环境时加` --env=production` 使用生成环境配置
5. 修改`config.default.js` 的email,adminHost和security白名单设置
6. `npm run dev` open http://localhost:3000/

## Help
- 关于mysql数据库5.7及以上`/api/errors?userError=true`接口报错`this is incompatible with sql_mode=only_full_group_by`解决方法

直接在mysql配置文件最下方加上以下配置重启mysql即可
```sql_mode=STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION```

[参考文章：5分钟学会MySQL-
                "this is incompatible with sql_mode=only_full_group_by"错误解决方案](https://blog.csdn.net/qq_42175986/article/details/82384160)

## 生产环境
1. `npm install pm2 -g`
2. 完成使用的前5步
3. 进入根目录执行`pm2 start pm2.json` 即可
