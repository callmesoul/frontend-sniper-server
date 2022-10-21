import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTagDto } from './create-user-tag.dto';

export class UpdateUserTagDto extends PartialType(CreateUserTagDto) {}
