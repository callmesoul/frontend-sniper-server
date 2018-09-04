'use strict';
module.exports = {
    Email:{
        emailApp(root, params, ctx) {
            return ctx.model.App.findById(root.appId);
        }
    },
    Query: {
        async emailList(root, params, ctx) {

            let page=params.page || 1;
            let limlt=params.limit || 12;
            let offset=(page-1)*limlt;
            let where={};
            if(params.appId){
                where.appId=params.appId;
            }
            let emails=await ctx.model.Email.findAll({where:where,limit:limlt,offset:offset});
            let count =await ctx.model.Email.count();
            params.totalPage=Math.ceil(count/limlt);

            return{
                pageParams:params,
                rows:emails
            }
        }
    },
    Mutation: {

    }
};
