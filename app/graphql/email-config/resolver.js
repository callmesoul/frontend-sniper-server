'use strict';
module.exports = {
    Query: {
        emailConfig(root, params, ctx) {
            return ctx.model.EmailConfig.findOne();
        }
    },
    Mutation: {
        async updateEmailConfig(root, params, ctx) {
            var config=await ctx.model.EmailConfig.findOne();
            if(config){
                config.update(params);
            }else{
                config=await ctx.model.EmailConfig.create(params);
            }
            return config;
        }
    }
};
