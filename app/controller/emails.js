'use strict';
const nodemailer = require('nodemailer');
const Controller = require('egg').Controller;
const moment = require('moment');

class ErrorController extends Controller {
    async index(ctx) {
        let query = ctx.request.query;
        let page = query.page ? parseInt(query.page) : 1;
        let limit = query.limit ? parseInt(query.limit) : 12;
        let offset = (page - 1) * limit;
        let where = {};
        if (query.appId) {
            where.appId = query.appId;
        }
        if (query.getSelf) {
            where.userId = ctx.user.id;
        }
        console.log('-----------------------------------------');
        console.log(where);
        console.log('-----------------------------------------');
        let result = await ctx.model.Email.findAndCountAll(
            {
                where: where,
                limit: 12,
                offset: offset,
                include: [
                    {
                        model: ctx.model.App,
                    }
                ],
                order: [['createdAt', 'DESC']]
            }
        );

        ctx.body = result;
    }

    async create(ctx) {
        let params = ctx.request.body;
        let email = await ctx.model.Email.findOne({where: params});
        if (email) {
            ctx.status = 400;
            ctx.body = {
                msg: '同一个项目和邮箱已配置过了'
            }
        } else {
            params.userId = ctx.user.id;
            email = await ctx.model.Email.create(params);
            if (email) {
                ctx.body = {
                    email: email
                }
            } else {
                ctx.status = 400;
                ctx.body = {
                    msg: '创建失败'
                }
            }
        }
    };

    async show(ctx) {

    }

    async update(ctx) {

    }

    async destroy(ctx) {

    }

    async send(ctx) {
        let appId = ctx.request.header.appid;
        let appScrect = ctx.request.header.appscrect;
        let data = ctx.request.body.error;
        data.createdAt = ctx.request.body.date;
        let app = await ctx.model.App.findOne({where: {appId: appId, appScrect: appScrect}});
        console.log(appId);
        console.log(appScrect);
        console.log(app);
        if (app && app.emailNotice) {
            data.appId = app.id;
            let error = await ctx.model.Error.create(data);
            let email = await ctx.model.EmailConfig.findOne({where: {userId: app.userId}});

            let count = await ctx.model.Error.count({
                where: {
                    title: error.title,
                    appId: error.appId,
                    level: error.level,
                    category: error.category
                }
            });
            if (count === 1 || (count % 5) === 0) {
                var transporter = nodemailer.createTransport({
                    service: email.server,
                    port: 465, // SMTP 端口
                    secureConnection: true, // 使用了 SSL
                    auth: {
                        user: email.user,
                        // 这里密码不是qq密码，是你设置的smtp授权码
                        pass: email.pass,
                    }
                });
                let emailList = await ctx.model.Email.findAll({where: {appId: error.appId}, fields: ['email']});
                let emailListConfig = [];
                emailList.map((item) => {
                    let mailOptions = {
                        from: email.user, // sender address
                        to: item.email, // list of receivers
                        subject: '【' + app.name + '】' + error.title, // Subject line
                        text: 'title:' + error.title + '\n', // plaintext body
                        html: '<div style="width:100%;">\n' +
                            ' <div style="background:#aaaaaa; color:#ffffff;font-weight:700; text-align:center; font-size:0;">\n' +
                            '  <span style="display:inline-block;width:20%; font-size:16px;line-height:30px;">项目</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:16px;line-height:30px;">时间</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:16px;line-height:30px;">分类</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:16px;line-height:30px;">类型</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:16px;line-height:30px;">错误次数</span>\n' +
                            ' </div>\n' +
                            '<div style=" text-align:center; font-size:0; background:#eeeeee;">\n' +
                            '  <span style="display:inline-block;width:20%; font-size:14px;line-height:30px;">' + app.name + '</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:14px;line-height:30px;">\'+moment(error.createdAt,\'YYYY年MM月DD日 HH:mm\')+\'</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:14px;line-height:30px;">' + error.category + '</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:14px;line-height:30px;">' + error.level + '</span>\n' +
                            '  <span style="display:inline-block;width:20%; font-size:14px;line-height:30px;">' + count + '</span>\n' +
                            ' </div>\n' +
                            '</div>\n' +
                            '\n' +
                            '<div style="width:100%;">\n' +
                            ' <div style="background:#aaaaaa; color:#ffffff;font-weight:700; text-align:center; font-size:0;">\n' +
                            '  <div style="font-size:16px;line-height:30px;">标题</div>\n' +
                            ' </div>\n' +
                            '<div style=" text-align:center; background:#eeeeee;">\n' +
                            '  <pre>' + error.title + '</pre>\n' +
                            ' </div>\n' +
                            '</div>\n' +
                            '\n' +
                            '<div style="width:100%;">\n' +
                            ' <div style="background:#aaaaaa; color:#ffffff;font-weight:700; text-align:center; font-size:0;">\n' +
                            '  <div style="font-size:16px;line-height:30px;">错误堆栈</div>\n' +
                            ' </div>\n' +
                            '<div style=" text-align:center; background:#eeeeee;">\n' +
                            '  <pre>' + error.msg + '</pre>\n' +
                            ' </div>\n' +
                            '</div>' // html body
                    };
                    emailListConfig.push(mailOptions);
                })
                emailListConfig.map(item => {
                    transporter.sendMail(item, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Message sent: ' + info.response);
                        }
                    });
                })
            }


            ctx.body = {
                message: '提交成功'
            };
        } else {
            ctx.body = {
                message: '项目不存在'
            };
        }
    }
}

module.exports = ErrorController;
