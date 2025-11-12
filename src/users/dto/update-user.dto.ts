import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto'; // ← Ahora existe

export class UpdateUserDto extends PartialType(CreateUserDto) {}