import { PartialType } from "@nestjs/mapped-types";
import { CreateProgresoLeccionDto } from "./create-progreso-leccion.dto";

export class UpdateProgresoLeccionDto extends PartialType(CreateProgresoLeccionDto) {}
