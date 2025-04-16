import { Controller } from "@nestjs/common";
import { PropietariosService } from "./propietarios.service";

@Controller('propietarios')
export class PropietariosController {
    constructor(private readonly propietariosService: PropietariosService) {}
}