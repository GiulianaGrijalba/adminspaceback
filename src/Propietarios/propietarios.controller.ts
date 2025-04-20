import { Controller, Put, Delete, Param, Body } from "@nestjs/common";
import { PropietariosService } from "./propietarios.service";

@Controller('propietarios')
export class PropietariosController {
    constructor(private readonly propietariosService: PropietariosService) {}

    @Put(':id')
    updatePropietario(@Param('id') id: string, @Body() updateDto: any) {
        return this.propietariosService.updatePropietario(id, updateDto);
    }

    @Delete(':id')
    deletePropietario(@Param('id') id: string) {
        return this.propietariosService.deletePropietario(id);
    }
}