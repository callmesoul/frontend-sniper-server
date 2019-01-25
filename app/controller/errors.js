'use strict';
const Controller = require('egg').Controller;

class ErrorController extends Controller {
    async index(ctx) {
        let group=[];
        if(!ctx.request.query.appId){
            group=['title','appId','level','category'];
        }
        let errors=await ctx.model.Error.findAll({
            include:[{
                model:ctx.model.App,
                as:'errorApp',
                where:{userId: ctx.user.id}
            }],
            limit:30,
            group:group,
            order: [
                ['createdAt', 'DESC']
            ]
        });
        this.body={
            errors:errors
        }
    }

    async create(ctx){

        if(!ctx.request.header.appId || !ctx.request.header.appScrect){
            ctx.status=400;
            ctx.body={
                'msg':'appId或appScrect有误'
            }
        }else{
            let app=await ctx.model.App.findOne({where:{appId:ctx.request.header.appId,appScrect:ctx.request.header.appScrect}});
            if(app){
                let body=ctx.request.body;
                body.appId=app.id;
                let error=await ctx.model.Errors.create(body);
            }else{
                ctx.status=400;
                ctx.body={
                    'msg':'appId或appScrect有误'
                }
            }
        }

        console.log(ctx.request.query);
        ctx.body='asdsd';
    };

    async show(ctx){

    }

    async update(ctx){

    }

    async destroy(ctx){

    }
}

module.exports = ErrorController;
