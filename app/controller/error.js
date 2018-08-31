'use strict';

const Controller = require('egg').Controller;

class ErrorController extends Controller {
  async index(ctx) {
    let appId=ctx.request.header.appid;
    let appScrect=ctx.request.header.appscrect;
    let data=ctx.request.body.error;
    data.createdAt=ctx.request.body.date;
    let app=await ctx.model.App.findOne({where:{appId:appId,appScrect:appScrect}});
    console.log(appId);
    console.log(appScrect);
    console.log(app);
    if(app){
      data.appId=app.id;
      let error=await ctx.model.Error.create(data);
        ctx.body={
            message:'提交成功'
        };
    }else{
      ctx.body={
        message:'项目不存在'
      };
    }
  }
}

module.exports = ErrorController;
