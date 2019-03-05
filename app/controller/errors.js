'use strict';
const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');
const moment = require('moment');
const parser = require('ua-parser-js');

class ErrorController extends Controller {
    async index(ctx) {
        let group;
        let includeAppWhere={};
        let errors;
        if(ctx.request.query.userErrors){
            errors=await ctx.model.query("SELECT * FROM (SELECT `errors`.*,`apps`.name from `errors` LEFT JOIN `apps` ON `errors`.`appId`=`apps`.`id` WHERE `apps`.userId="+ctx.user.id+" ORDER BY `createdAt` DESC LIMIT 1000) as result GROUP BY `title`,'appId','level','category' ORDER BY `createdAt` DESC", { type: ctx.model.Sequelize.QueryTypes.SELECT});
        }else{
            errors=await ctx.model.Error.findAll({
                include:[{
                    model:ctx.model.App,
                }],
                order: [['createdAt', 'DESC']],
            });
        }
        ctx.body={
            errors:errors
        }
    }

    async create(ctx){
        let appId=ctx.request.header.appid;
        let appScrect=ctx.request.header.appscrect;
        if(!appId || !appScrect){
            ctx.status=400;
            ctx.body={
                'msg':'appId或appScrect有误'
            }
        }else{
            let app=await ctx.model.App.findOne({where:{appId:appId,appScrect:appScrect}});
            if(app){
                let ua=parser(ctx.request.header['user-agent']);
                console.log("=========================ua");
                let body=ctx.request.body;
                body.appId=app.id;
                let params=Object.assign(body,ua);
                let error=await ctx.model.Error.create(params);
                //发邮件
                if(app.emailNotice){
                    ctx.model.Error.count({where:{title:error.title,appId:error.appId,level:error.level,category:error.category}}).then((count)=>{
                        console.log('=============================');
                        console.log(count);
                        console.log('=============================');
                        if(count===1 || (count%5)===0){
                            let transporter = nodemailer.createTransport({
                                service: ctx.app.config.email.server,
                                port: 465, // SMTP 端口
                                secureConnection: true, // 使用了 SSL
                                auth: {
                                    user: ctx.app.config.email.user,
                                    // 这里密码不是qq密码，是你设置的smtp授权码
                                    pass: ctx.app.config.email.pass,
                                }
                            });
                            ctx.model.Email.findAll({where:{appId:error.appId},fields: ['email']}).then(emailList=>{
                                let emailListConfig=[];
                                emailList.map((item)=>{
                                    let format='YYYY年MM月DD日 HH:mm';
                                    let url= `${ctx.app.config.adminHost}/error/${error.id}`;
                                    let mailOptions = {
                                        from: ctx.app.config.email.user, // sender address
                                        to: item.email, // list of receivers
                                        subject: '【'+app.name+'】'+error.title, // Subject line
                                        text: 'title:'+error.title+'', // plaintext body
                                        html: '<p style="text-align: center; margin-top: 30px;">如若不能正常显示，请<a target="_blank" href="'+url+'">点击这里</a></p>' +
                                            '<table style="width:100%;max-width: 700px;  margin: 30px auto; font-weight: 100; border: 1px solid #000000; min-height: 800px;">' +
                                            '    <tbody><tr style="text-align: center">' +
                                            '        <td style="background: #000; color: #fff;padding: 1em 0;">' +
                                            '            <img src="https://callmesoul-blog.oss-cn-shenzhen.aliyuncs.com/frontend-sniper.svg" style="width: 3em;height: 3em; margin-right: 0.5em; display: inline-block; vertical-align: middle;">' +
                                            '            <span style="font-size: 4em; display: inline-block; vertical-align: middle;">Frontend Sniper</span>' +
                                            '            <div style="text-align: center"><a title="Frontend Sniper" alt="Frontend Sniper" href="https://github.com/callmesoul/frontend-sniper" target="_blank" style="color: #ffffff;">https://github.com/callmesoul/frontend-sniper</a></div>' +
                                            '        </td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block; margin-top: 1em;">' +
                                            '        <td style="font-size: 1.5em; ">项目名：'+app.name+'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em;">' +
                                            '        <td style="background: #8c8a86; color: #ffffff; font-size: 1.3em; padding: 0.5em;">'+error.title+'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em;">' +
                                            '        <td style="">错误分类：'+error.category+'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em;">' +
                                            '        <td style="">错误类型：'+error.level+'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em;">' +
                                            '        <td style="">错误次数：'+count+'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em;">' +
                                            '        <td style="">发生时间：'+ moment(error.createdAt).format(format) +'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em;">' +
                                            '        <td style="">错误堆栈：'+error.msg+'</td>' +
                                            '    </tr>' +
                                            '    <tr style="padding: 0 1em; display: block;margin-top: 1em; text-align: center;">' +
                                            '        <td style=" text-align: center;"><a href="'+url+'" style="display: inline-block; background: #000000; color:  #ffffff; width: 150px; line-height: 40px;text-align: center;">查看详情</a></td>' +
                                            '    </tr>' +
                                            '</tbody></table>'
                                    };
                                    emailListConfig.push(mailOptions);
                                });
                                emailListConfig.map(item=>{
                                    transporter.sendMail(item, function(error, info){
                                        if(error){
                                            console.log(error);
                                        }else{
                                            console.log('Message sent: ' + info.response);
                                        }
                                    });
                                })
                            });
                        }
                    });
                }
                if(error){
                    ctx.body='success receive  error'
                }
            }else{
                ctx.status=400;
                ctx.body={
                    'msg':'appId或appScrect有误'
                }
            }
        }
    };

    async show(ctx){
        let error = await ctx.model.Error.findById(ctx.params.id);
        if(error){
            let sames= await ctx.model.Error.findAll({where:{title:error.title,appId:error.appId,level:error.level,category:error.category},order: [
                    ['createdAt', 'DESC']
                ]});
            ctx.body={
                error:error,
                sames:sames
            }
        }else{
            ctx.status=400;
            ctx.body={
                msg:'找不到该错误'
            }
        }
    }

    async update(ctx){
        let res= await ctx.model.Error.update(ctx.request.body,{where:{id:ctx.params.id}});
        if(res &&  res[0]>0){
            ctx.body={
                msg: '更新成功'
            }
        }else{
            ctx.status=400;
            ctx.body={
                msg: '更新失败'
            }
        }
    }

    async destroy(ctx){
        let res= await ctx.model.Error.destroy({where:{id:ctx.params.id}});
        if(res && res>0){
            ctx.body={
                msg: '删除成功'
            }
        }else {
            ctx.status=400;
            ctx.body={
                msg: '删除失败，请稍后再试'
            }
        }
    }
}

module.exports = ErrorController;
