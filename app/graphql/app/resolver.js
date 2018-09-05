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
            return ctx.model.App.findAll({where:{userId:ctx.user.id}});
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
                return true;
            }else {
                return false;
            }
        },
    }
};
