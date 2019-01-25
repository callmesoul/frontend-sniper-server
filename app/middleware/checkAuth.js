module.exports = options => {
    return async function checkAuth(ctx, next) {
        let method = ctx.request.method;
        let token = ctx.request.header.token || ctx.request.body.token || ctx.request.query.token;
        let setUser=()=>{
            return new Promise(async(reslove)=>{
                try {
                    var decoded = ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
                    if(decoded.id){
                        let user= await ctx.model.User.findById(decoded.id);

                        if(user){
                            console.log('=============middle====================');
                            console.log(user);
                            ctx.user=user;
                            reslove(true);
                        }else{
                            reslove(false);
                        }
                    }
                }
                catch {
                    reslove(false);
                }
            })
        };
        if(method=='GET'){
            if(token){
                await setUser();
            }
            await next();
        }else{
            /*上报错误不需要权限*/
            if(ctx.request.url==='/api/errors'){
                console.log('/errors');
                await next();
            }else{
                if(token){
                    let result= await setUser();
                    if(result){
                        await next();
                    }else{
                        ctx.status=403;
                        ctx.body={
                            'msg':'你没权限访问'
                        }
                    }
                }else {
                    ctx.status=403;
                    ctx.body={
                        'msg':'你没权限访问'
                    }
                }
            }
        }

    };
};
