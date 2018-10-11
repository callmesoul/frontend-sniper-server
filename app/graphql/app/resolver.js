'use strict';
module.exports = {
    Error:{
        async errorApp(root,params,ctx){
          return await ctx.model.App.findById(root.appId);
      }
    },
    Query: {
        app(root, {id}, ctx) {
            return ctx.model.App.findById(id);
        },
        userApps(root, params , ctx){
            const where={userId:ctx.user.id};
            if(params.name){
                where.name={$like:`%${params.name}%`};
            }
            return ctx.model.App.findAll({where:where,order: [['createdAt', 'DESC']]});
        }
    },
    Mutation: {
        createApp: async (root, data, ctx) => {
            var app = await ctx.model.App.findOne({where: {name: data.name}});
            if (app) {
                throw new Error('项目名称已存在');
            } else {
                data.userId=ctx.user.id;
                app = await ctx.model.App.create(data);
                return app;
            }
        },
        updateApp: async (root, params, ctx) => {
            var res = await ctx.model.App.update(params,{where: {id: params.id}});
            if(res[0]>0){
                let app = await ctx.model.App.findOne({where: {id: params.id}});
                return app;
            }else {
                throw new Error('更新失败');
            }
        },
        deleteApp:async (root, params, ctx) =>{
            let res=await ctx.model.App.destroy({where:{id:params.id}});
            if(res>0){
                return true
            }else {
                throw new Error('删除失败，请稍后再试')
            }

        }
    }
};
