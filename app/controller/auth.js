'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index(ctx) {
    let username=ctx.request.body.username;
    let password=ctx.request.body.password;
    let user=await ctx.model.User.findOne({where:{username:username}});
    if(user){
      if(user.password===password){
        let token=await ctx.app.jwt.sign({id: user.id},ctx.app.config.jwt.secret);
        ctx.body={
          token:token
        }
      }else{
          ctx.response.status=403;
          ctx.response.body={
              message:'密码错误'
          };
      }
    }else{
      ctx.response.status=403;
      ctx.response.body={
        message:'用户不存在'
      };
    }
  }
}

module.exports = HomeController;
