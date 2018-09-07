'use strict';

const Controller = require('egg').Controller;
const nodemailer = require('nodemailer');
class HomeController extends Controller {
  async index(ctx) {
    ctx.body="欢迎使用frontend sniper"
  }
}

module.exports = HomeController;
