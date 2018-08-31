'use strict';

module.exports = {
    Query: {
        user(root, {id}, ctx) {
            return ctx.connector.user.fetchById(id);
        }
    },
    Mutation: {
        register: async (root, data, ctx) => {
            var user = await ctx.model.User.findOne({where: {username: data.username}});
            if (user) {
                throw new Error('用户名已存在');
            } else {
                user = await ctx.model.User.findOne({where: {email: data.email}});
                if (user) {
                    throw new Error('邮箱已被使用');
                } else {
                    user = await ctx.model.User.create(data);
                    let token = await ctx.app.jwt.sign({id: user.id}, ctx.app.config.jwt.secret);
                    return token;
                }
            }
        },
    }
};
