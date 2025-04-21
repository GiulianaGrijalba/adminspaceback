import { Controller, Put, Delete, Param, Body } from "@nestjs/common";
import { InquilinoService } from "./inquilino.service";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Roles } from "src/auth/decorators/roles.decorator";
import { UserRole } from "src/Complementos/enum.Role";

@Controller('inquilinos')
export class InquilinoController {
    constructor(private readonly inquilinoService: InquilinoService) {}

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar inquilino' })
    @ApiResponse({ status: 200, description: 'Inquilino actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Inquilino no encontrado' })
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    updateInquilino(@Param('id') id: string, @Body() updateDto: any) {
        return this.inquilinoService.updateInquilino(id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar inquilino' })
    @ApiResponse({ status: 200, description: 'Inquilino eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Inquilino no encontrado' })
    @ApiBearerAuth()
    @Roles(UserRole.ADMIN)
    deleteInquilino(@Param('id') id: string) {
        return this.inquilinoService.deleteInquilino(id);
    }
}