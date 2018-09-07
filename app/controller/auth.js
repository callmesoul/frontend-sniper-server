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
  async register(ctx){
      let username=ctx.request.body.username;
      let password=ctx.request.body.password;
      let email=ctx.request.body.email;
      var user;
      user=await ctx.model.User.findOne({where:{username:username}});
      if(user){
          ctx.response.status=403;
          ctx.response.body={
              message:'用户名已注册'
          };
      }else{
          user=await ctx.model.User.findOne({where:{email:email}});
          if(user){
              ctx.response.status=403;
              ctx.response.body={
                  message:'用户名已注册'
              };
          }else{
              user =await ctx.model.User.create(ctx.request.body);
              let token=await ctx.app.jwt.sign({id: user.id},ctx.app.config.jwt.secret);
              ctx.response.status=200;
              ctx.response.body={
                  token:token
              };
          }

      }

  }
}

module.exports = HomeController;
