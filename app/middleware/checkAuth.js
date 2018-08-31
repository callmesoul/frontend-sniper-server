module.exports = options => {
    return async function checkAuth(ctx, next) {
        let path=ctx.request.url;
        if(path==='/login' || path==='/createError'){
            await next();
        }else {
            let token = ctx.request.header.token || ctx.request.body.token || ctx.request.query.token;
            if(token){
                try{
                    let decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);

                    if(decoded){
                        let user=await ctx.model.User.findById(decoded.id);
                        if(user){
                            ctx.user=user;
                            await next();
                        }else{
                            ctx.response.status = 403;
                            ctx.response.body = {
                                error: "token无效或过期，禁止请求！"
                            }
                        }
                    }
                }
                catch(err) {
                    console.log(err)
                    ctx.response.status = 403;
                    ctx.response.body = {
                        error: "token无效或过期，禁止请求！"
                    }
                }
            }else{
                ctx.response.status = 403;
                ctx.response.body = {
                    error: "token无效或过期，禁止请求！"
                }
            }
        }
    };
};
