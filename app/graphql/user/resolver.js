'use strict';

module.exports = {
  Query: {
    user(root, { id }, ctx) {
      return ctx.connector.user.fetchById(id);
    }
  },
    Mutation:{
      register:(root, data, ctx) =>{
          var user=ctx.model.User.findOne({where:{username:data.username}});
          if(user){
              throw new Error ('用户名已存在');
          }else{
              user=ctx.model.User.findOne({where:{email:data.email}});
              if(user){
                if(user){
                    throw new Error ('邮箱已被使用');
                }else{
                    user=ctx.model.User.create(data);
                    let token=ctx.jwt.sign({ id: user }, ctx.config.jwt.secret);
                    return token;
                }
              }
          }
      },
    }
};
