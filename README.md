![logo](https://github.com/callmesoul/frontend-sniper-admin/blob/master/static/frontend-sniper.png)

# frontend-sniper-server
###前端错误监控系统服务端
其实线上已经有很多监控系统了，例如[fundebug](https://www.fundebug.com/)。试用了一下还是挺不错的。
可惜都是收费的，免费的只能创建一个项目，收费也不便宜。
对于一些小公司来说很难花钱去搞，而且对小公司来说功能也不需要太复杂。
一些js的报错和接口报错就可以大大加快bug的修复，和预知bug。（当上级和测试都还没发现时）
所以我还是写这么个系统，是从自身需求出发吧。功能可以慢慢完善。


现在初期只实现了简单的js和接口资源报错。后期会加入UA和用户等信息以完善错误信息追踪错误。
对服务端还是新手所以代码质量....graphql也是试手。
但好在错误监控系统一般内部人使用，独立不影响线上项目和用户。所以大胆地使用吧。

## 项目集

- 服务端 [frontend-sniper-server](https://github.com/callmesoul/frontend-sniper-server)
- 管理后台 [frontend-sniper-admin](https://github.com/callmesoul/frontend-sniper-admin)
- 错误探针 [better-js](https://github.com/callmesoul/better-js)

## 技术栈

 1. [egg](https://eggjs.org/zh-cn/)
 2. [sequelize](http://docs.sequelizejs.com)
 3. [GraphQl](http://graphql.cn/)

## 使用
1. clone项目
2. `npm install` 安装依赖
3. 修改`config/config.*.js`和`database/config.json`的数据库配置并建好数据库
4. `npx sequelize db:migrate` 初始化数据库，没npx请先全局安装npx
5. `npm run dev` open http://localhost:7001/


## todo

- [x] 支持vue
- [x] 邮件通知（新错误报错，旧错误5n次发邮件报错）
- [ ] 添加UA信息
- [ ] 添加用户信息
- [ ] 记录用户行为
- [ ] 手动上传报错


## QuickStart
<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ npm stop
```



### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org