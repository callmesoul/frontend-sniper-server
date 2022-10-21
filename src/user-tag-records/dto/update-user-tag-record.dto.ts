import { PartialType } from '@nestjs/mapped-types';
import { CreateUserTagRecordDto } from './create-user-tag-record.dto';

export class UpdateUserTagRecordDto extends PartialType(CreateUserTagRecordDto) {}
