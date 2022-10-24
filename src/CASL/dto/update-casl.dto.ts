import { PartialType } from '@nestjs/mapped-types';
import { CreateCaslDto } from './create-casl.dto';

export class UpdateCaslDto extends PartialType(CreateCaslDto) {}
