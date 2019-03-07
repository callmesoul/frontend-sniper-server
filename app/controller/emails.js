'use strict';
const nodemailer = require('nodemailer');
const Controller = require('egg').Controller;
const moment = require('moment');

class ErrorController extends Controller {
    async index(ctx) {
        let query = ctx.request.query;
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 12;
        let offset = (page - 1) * limit;
        let where = {};
        if (query.appId) {
            where.appId = query.appId;
        }
        if (query.getSelf) {
            where.userId = ctx.user.id;
        }
        let result = await ctx.model.Email.findAndCountAll(
            {
                where: where,
                limit: limit,
                offset: offset,
                include: [
                    {
                        model: ctx.model.App,
                    }
                ],
                order: [['createdAt', 'DESC']]
            }
        );

        ctx.body = result;
    }

    async create(ctx) {
        let params = ctx.request.body;
        let email = await ctx.model.Email.findOne({where: params});
        if (email) {
            ctx.status = 400;
            ctx.body = {
                msg: '同一个项目和邮箱已配置过了'
            }
        } else {
            params.userId = ctx.user.id;
            email = await ctx.model.Email.create(params);
            if (email) {
                ctx.body = {
                    email: email,
                    msg:'创建成功'
                }
            } else {
                ctx.status = 400;
                ctx.body = {
                    msg: '创建失败'
                }
            }
        }
    };

    async show(ctx) {
        let email = await ctx.model.Email.findById(ctx.params.id);
        if(email){
            ctx.body={
                email:email
            }
        }else{
            ctx.status=400;
            ctx.body={
                msg:'找不到该邮箱'
            }
        }
    }

    async update(ctx) {
        let res= await ctx.model.Email.update(ctx.request.body,{where:{id:ctx.params.id}});
        if(res &&  res[0]>0){
            ctx.body={
                msg: '更新成功'
            }
        }else{
            ctx.status=400;
            ctx.body={
                msg: '更新失败'
            }
        }
    }

    async destroy(ctx) {
        let res= await ctx.model.Email.destroy({where:{id:ctx.params.id}});
        if(res && res>0){
            ctx.body={
                msg: '删除成功'
            }
        }else {
            ctx.status=400;
            ctx.body={
                msg: '删除失败，请稍后再试'
            }
        }
    }

}

module.exports = ErrorController;
