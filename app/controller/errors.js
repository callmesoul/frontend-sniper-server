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
        console.log(ctx.request.body);
    };

    async show(ctx){

    }

    async update(ctx){

    }

    async destroy(ctx){

    }
}

module.exports = ErrorController;
