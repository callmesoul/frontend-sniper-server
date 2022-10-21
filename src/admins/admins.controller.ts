import { Controller } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Admin } from './admin.model';

@Controller('admins')
export class AdminsController {
  constructor(
    @InjectModel(Admin)
    private adminModel: typeof Admin,
  ) {}
}
