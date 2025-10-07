import { PartialType } from "@nestjs/mapped-types";
import { CreateTemarioDto } from "./create-temario.dto";

export class UpdateTemarioDto extends PartialType(CreateTemarioDto) {}