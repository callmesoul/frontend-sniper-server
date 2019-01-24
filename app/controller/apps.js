'use strict';
const Controller = require('egg').Controller;


class ErrorController extends Controller {
  async index(ctx) {
      const where={userId:ctx.user.id};
      if(params.name){
          where.name={$like:`%${params.name}%`};
      }
      return ctx.model.App.findAll({where:where,order: [['createdAt', 'DESC']]});
  }
}

module.exports = ErrorController;
