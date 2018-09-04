'use strict';

const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');
class HomeController extends Controller {
  async index() {
      var transporter = nodemailer.createTransport({
          service: 'QQ',
          port: 465, // SMTP 端口
          secureConnection: true, // 使用了 SSL
          auth: {
              user: '547437716@qq.com',
              // 这里密码不是qq密码，是你设置的smtp授权码
              pass: 'gxnwmwmrwlhebaih',
          }
      });


      var mailOptions = {
          from: '547437716@qq.com', // sender address
          to: '547437716@qq.com', // list of receivers
          subject: 'Hello ✔', // Subject line
          text: 'Hello world ✔', // plaintext body
          html: '<b>Hello world ✔</b>' // html body
      };

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          }
      });
  }
}

module.exports = HomeController;
