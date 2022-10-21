import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from 'src/admins/admin.model';
const crypto = require('crypto');

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const admin = await this.adminModel.findOne({
      where: { username },
    });
    const md5Pass = crypto.createHash('md5').update(pass).digest('hex');
    if (admin && admin.password === md5Pass) {
      return this.login({ username: admin.username, sub: admin.id });
    } else {
      throw new HttpException('用户或密码错误', HttpStatus.BAD_REQUEST);
    }
  }

  async login(admin: { username: string; sub: string }) {
    return {
      access_token: this.jwtService.sign(admin),
    };
  }
}
