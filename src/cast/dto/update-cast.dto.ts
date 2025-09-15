import { PartialType } from '@nestjs/mapped-types';
import { CreateCastDto } from './create-cast.dto';


export class UpdateCastDto  extends PartialType(CreateCastDto) {

    //@IsString()
    //@MinLength(1)
    //@IsOptional()
    //name: string;
//
    //@IsInt()
    //@IsPositive()
    //@IsOptional()
    //age: number;
//
    //@IsString()
    //@IsOptional()
    //breed?: string;
}
