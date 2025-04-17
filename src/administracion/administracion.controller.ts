import { Controller, Get } from '@nestjs/common';
import { AdministracionService } from './administracion.service';

@Controller('administracion')
export class AdministracionController {
  constructor(private readonly administracionService: AdministracionService) {}

  @Get('allUsers')
  async allUser() {
    return await this.administracionService.findAll();
  }
}
