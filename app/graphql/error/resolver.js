'use strict';
module.exports = {

    Query: {
        userErrors(root, params, ctx) {
            return ctx.model.Error.findAll({
                where: {userId: ctx.user.id},
                include:[{
                    model:ctx.model.App,
                    as:'errorApp'
                }]
            })
        }
    },
    Mutation: {

    }
};
