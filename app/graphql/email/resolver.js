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
        async deleteEmail(root,params,ctx){
            let res = await ctx.model.Email.destroy({where:{id:params.id}});
            if(res===1){
                return true
            }else {
                return false;
            }
        },
        async createEmail(root,params,ctx){
            return await ctx.model.Email.create(params);
        },
        async updateEmail(root,params,ctx){
            let res= await ctx.model.Email.update(params,{where:{id:params.id}});
            if(res[0]>0){
                return true;
            }else {
                return false;
            }
        }
    }
};
