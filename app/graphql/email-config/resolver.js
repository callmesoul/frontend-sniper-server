'use strict';
module.exports = {
    Query: {
        emailConfig(root, params, ctx) {
            return ctx.model.EmailConfig.findOne({where:{userId:ctx.user.id}});
        }
    },
    Mutation: {
        async updateEmailConfig(root, params, ctx) {
            console.log(ctx.user.id)
            console.log(params)
            params.userId=ctx.user.id;
            console.log(params)
            var config=await ctx.model.EmailConfig.findOne({where:{userId:ctx.user.id}});
            console.log(config);
            if(config){
                config.update(params);
            }else{
                config=await ctx.model.EmailConfig.create(params);
                console.log(config);
            }
            return config;
        }
    }
};
