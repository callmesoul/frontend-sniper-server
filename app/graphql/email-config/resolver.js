'use strict';
module.exports = {
    Query: {
        emailConfig(root, params, ctx) {
            return ctx.model.EmailConfig.findOne({where:{userId:ctx.user.id}});
        }
    },
    Mutation: {
        async updateEmailConfig(root, params, ctx) {
            params.userId=ctx.user.id;
            var config=await ctx.model.EmailConfig.findOne({where:{userId:ctx.user.id}});
            if(config){
                config.update(params);
            }else{
                config=await ctx.model.EmailConfig.create(params);
            }
            return config;
        }
    }
};
