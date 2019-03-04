'use strict';
const Controller = require('egg').Controller;


class ErrorController extends Controller {
  async index(ctx) {
      if(ctx.user){
          let query=ctx.request.query;
          let where={};
          if(query.getSelf){
              where.userId=ctx.user.id;
          }
          if(query.name){
              where.name={$like:`%${query.name}%`};
          }
          let apps=await ctx.model.App.findAll({where:where,order: [['createdAt', 'DESC']]});
          ctx.body={
              apps:apps
          }
      }else{
          ctx.status=403;
          ctx.body={
              msg:'您未登陆或登陆失效'
          }
      }
  }

  async show(ctx){
      let app = await ctx.model.App.findById(ctx.params.id);
      if(app){
          ctx.body={
              app:app
          }
      }else{
          ctx.status=400;
          ctx.body={
              msg:'找不到改项目'
          }
      }
  }

  async create(ctx) {
      let app = await ctx.model.App.findOne({where: {name: ctx.request.body.name}});
      if (app) {
          ctx.status=400;
          ctx.body={
              msg:'项目名称已存在'
          }
      } else {
          ctx.request.body.userId=ctx.user.id;
          let app = await ctx.model.App.create(ctx.request.body);
          ctx.body={
              app:app
          };
      }
  }

  async update(ctx) {
      let res = await ctx.model.App.update(ctx.request.body,{where: {id: ctx.request.body.id}});
      if(res[0]>0){
          ctx.body=true
      }else {
          ctx.status=400;
          ctx.body={
              msg:'更新失败,请稍后再试'
          }
      }
  }

  async destroy(ctx){
      let res=await ctx.model.App.destroy({where:{id:ctx.params.id}});
      if(res>0){
          ctx.body=true
      }else {
          ctx.status=400;
          ctx.body={
              msg:'删除失败，请稍后再试'
          };
      }
  }
}

module.exports = ErrorController;
