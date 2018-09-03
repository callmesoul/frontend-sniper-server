'use strict';
module.exports = {
    AppError:{
        pageParams(root, params, ctx) {
            return root.pageParams;
        },
        rows(root, params, ctx) {
            return root.rows;
        }
    },
    Query: {
        userErrors(root, params, ctx) {
            return ctx.model.Error.findAll({
                where: {userId: ctx.user.id},
                include:[{
                    model:ctx.model.App,
                    as:'errorApp'
                }]
            })
        },
        async appErrors(root, params, ctx) {
            let page=params.page || 1;
            let limit=params.limit || 12;
            let offset=(page-1)*limit;
            let error = await ctx.model.Error.findAll({where:{appId:params.id},limit:limit, offset:offset});
            let count = await ctx.model.Error.count({where:{appId:params.id}});
            params.totalPage=Math.ceil(count/limit);
            return {
                pageParams:params,
                rows:error
            };
        }

    },
    Mutation: {

    }
};
