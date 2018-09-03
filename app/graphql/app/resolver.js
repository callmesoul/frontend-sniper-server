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
        addApp: async (root, data, ctx) => {
            var app = await ctx.model.App.findOne({where: {name: data.name}});
            if (app) {
                throw new Error('项目名称已存在');
            } else {
                data.userId=ctx.user.id;
                app = await ctx.model.App.create(data);
                return app;
            }
        },
    }
};
