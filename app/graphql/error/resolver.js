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
    Error:{
        sameErrorList(root, params, ctx) {
            return ctx.model.Error.findAll({where:{title:root.title,appId:root.appId,level:root.level,category:root.category},order: [
                ['createdAt', 'DESC']
            ]})
        }
    },
    Query: {
        userErrors(root, params, ctx) {
            return ctx.model.Error.findAll({
                include:[{
                    model:ctx.model.App,
                    as:'errorApp',
                    where:{userId: ctx.user.id}
                }],
                limit:30,
                group:['title','appId','level','category'],
                order: [
                    ['createdAt', 'DESC']
                ]
            })
        },
        error(root, params, ctx) {
            return ctx.model.Error.findById(params.id);
        },
        async appErrors(root, params, ctx) {
            let page=params.page || 1;
            let limit=params.limit || 12;
            let offset=(page-1)*limit;
            let error = await ctx.model.Error.findAll({where:{appId:params.id},limit:limit, offset:offset,order: [['createdAt', 'DESC']]});
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
