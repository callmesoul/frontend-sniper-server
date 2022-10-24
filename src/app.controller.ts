import {
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthService } from './auth/auth.service';
import { Roles } from './roles/roles.decorator';
import { Role } from './roles/role.enum';
import { LoginDto } from './auth/auth.dto';
import { RolesGuard } from './roles/roles.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Post('auth/login')
  async login(@Body() loginDTo: LoginDto) {
    return await this.authService.validateUser(
      loginDTo.username,
      loginDTo.password,
    );
  }

  @Get()
  @Roles(Role.Admin)
  getHello(@Request() request: any): string {
    return this.appService.getHello();
  }
}
