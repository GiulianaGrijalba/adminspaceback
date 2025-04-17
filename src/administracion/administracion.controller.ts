import { 
    Controller, 
    Get, 
    Post, 
    Body, 
    Param, 
    Put, 
    Delete, 
    UseGuards,
    ParseUUIDPipe
  } from '@nestjs/common';
  import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
  import { AdministracionService } from './administracion.service';
  import { Roles } from '../auth/decorators/roles.decorator';
  import { UserRole } from '../Complementos/enum.Role';
  import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
  import { RolesGuard } from '../auth/guards/roles.guard';
  import { CreateUnidadDto } from './dto/create-unidad.dto';
  import { CreateServicioDto } from './dto/create-servicio.dto';
  import { UpdateServicioDto } from './dto/update-servicio.dto';
  import { CreateNotificacionDto } from './dto/create-notificacion.dto';
  
  @ApiTags('administracion')
  @Controller('administracion')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiBearerAuth()
  export class AdministracionController {
    constructor(private readonly administracionService: AdministracionService) {}
  
    // Endpoints de Usuarios
    @Get('usuarios')
    @ApiOperation({ summary: 'Obtener todos los usuarios' })
    @ApiResponse({ status: 200, description: 'Lista de todos los usuarios' })
    getAllUsers() {
      return this.administracionService.getAllUsers();
    }
  
    @Get('usuarios/:id')
    @ApiOperation({ summary: 'Obtener usuario por ID' })
    @ApiResponse({ status: 200, description: 'Usuario encontrado' })
    @ApiResponse({ status: 404, description: 'Usuario no encontrado' })
    getUserById(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.getUserById(id);
    }
  
    @Get('propietarios')
    @ApiOperation({ summary: 'Obtener todos los propietarios' })
    @ApiResponse({ status: 200, description: 'Lista de propietarios' })
    getPropietarios() {
      return this.administracionService.getPropietarios();
    }
  
    @Get('inquilinos')
    @ApiOperation({ summary: 'Obtener todos los inquilinos' })
    @ApiResponse({ status: 200, description: 'Lista de inquilinos' })
    getInquilinos() {
      return this.administracionService.getInquilinos();
    }
  
    // Endpoints de Unidades
    @Get('unidades')
    @ApiOperation({ summary: 'Obtener todas las unidades' })
    @ApiResponse({ status: 200, description: 'Lista de todas las unidades' })
    getAllUnidades() {
      return this.administracionService.getAllUnidades();
    }
  
    @Get('unidades/:id')
    @ApiOperation({ summary: 'Obtener unidad por ID' })
    @ApiResponse({ status: 200, description: 'Unidad encontrada' })
    @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
    getUnidadById(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.getUnidadById(id);
    }
  
    @Post('unidades')
    @ApiOperation({ summary: 'Crear nueva unidad' })
    @ApiResponse({ status: 201, description: 'Unidad creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    createUnidad(@Body() createUnidadDto: CreateUnidadDto) {
      return this.administracionService.createUnidad(createUnidadDto);
    }
  
    @Put('unidades/:id')
    @ApiOperation({ summary: 'Actualizar unidad existente' })
    @ApiResponse({ status: 200, description: 'Unidad actualizada exitosamente' })
    @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
    updateUnidad(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateUnidadDto: Partial<CreateUnidadDto>,
    ) {
      return this.administracionService.updateUnidad(id, updateUnidadDto);
    }
  
    @Delete('unidades/:id')
    @ApiOperation({ summary: 'Eliminar unidad' })
    @ApiResponse({ status: 200, description: 'Unidad eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Unidad no encontrada' })
    removeUnidad(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.removeUnidad(id);
    }
  
    // Endpoints de Servicios
    @Get('servicios')
    @ApiOperation({ summary: 'Obtener todos los servicios' })
    @ApiResponse({ status: 200, description: 'Lista de todos los servicios' })
    getAllServicios() {
      return this.administracionService.getAllServicios();
    }
  
    @Get('servicios/:id')
    @ApiOperation({ summary: 'Obtener servicio por ID' })
    @ApiResponse({ status: 200, description: 'Servicio encontrado' })
    @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
    getServicioById(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.getServicioById(id);
    }
  
    @Post('servicios')
    @ApiOperation({ summary: 'Crear nuevo servicio' })
    @ApiResponse({ status: 201, description: 'Servicio creado exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    createServicio(@Body() createServicioDto: CreateServicioDto) {
      return this.administracionService.createServicio(createServicioDto);
    }
  
    @Put('servicios/:id')
    @ApiOperation({ summary: 'Actualizar servicio existente' })
    @ApiResponse({ status: 200, description: 'Servicio actualizado exitosamente' })
    @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
    updateServicio(
      @Param('id', ParseUUIDPipe) id: string,
      @Body() updateServicioDto: UpdateServicioDto,
    ) {
      return this.administracionService.updateServicio(id, updateServicioDto);
    }
  
    @Delete('servicios/:id')
    @ApiOperation({ summary: 'Eliminar servicio' })
    @ApiResponse({ status: 200, description: 'Servicio eliminado exitosamente' })
    @ApiResponse({ status: 404, description: 'Servicio no encontrado' })
    removeServicio(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.removeServicio(id);
    }
  
    // Endpoints de Notificaciones
    @Get('notificaciones')
    @ApiOperation({ summary: 'Obtener todas las notificaciones' })
    @ApiResponse({ status: 200, description: 'Lista de todas las notificaciones' })
    getAllNotificaciones() {
      return this.administracionService.getAllNotificaciones();
    }
  
    @Get('notificaciones/:id')
    @ApiOperation({ summary: 'Obtener notificación por ID' })
    @ApiResponse({ status: 200, description: 'Notificación encontrada' })
    @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
    getNotificacionById(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.getNotificacionById(id);
    }
  
    @Post('notificaciones')
    @ApiOperation({ summary: 'Crear nueva notificación' })
    @ApiResponse({ status: 201, description: 'Notificación creada exitosamente' })
    @ApiResponse({ status: 400, description: 'Datos de entrada inválidos' })
    createNotificacion(@Body() createNotificacionDto: CreateNotificacionDto) {
      return this.administracionService.createNotificacion(createNotificacionDto);
    }
  
    @Put('notificaciones/:id/read')
    @ApiOperation({ summary: 'Marcar notificación como leída' })
    @ApiResponse({ status: 200, description: 'Notificación marcada como leída' })
    @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
    markNotificacionAsRead(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.markNotificacionAsRead(id);
    }
  
    @Delete('notificaciones/:id')
    @ApiOperation({ summary: 'Eliminar notificación' })
    @ApiResponse({ status: 200, description: 'Notificación eliminada exitosamente' })
    @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
    removeNotificacion(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.removeNotificacion(id);
    }
  
    // Endpoints de Solicitudes
    @Get('solicitudes')
    @ApiOperation({ summary: 'Obtener todas las solicitudes' })
    @ApiResponse({ status: 200, description: 'Lista de todas las solicitudes' })
    getAllSolicitudes() {
      return this.administracionService.getAllSolicitudes();
    }
  
    @Get('solicitudes/:id')
    @ApiOperation({ summary: 'Obtener solicitud por ID' })
    @ApiResponse({ status: 200, description: 'Solicitud encontrada' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
    getSolicitudById(@Param('id', ParseUUIDPipe) id: string) {
      return this.administracionService.getSolicitudById(id);
    }
  
    @Put('solicitudes/:id/status')
    @ApiOperation({ summary: 'Actualizar estado de una solicitud' })
    @ApiResponse({ status: 200, description: 'Estado de solicitud actualizado' })
    @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
    updateSolicitudStatus(
      @Param('id', ParseUUIDPipe) id: string,
      @Body('status') status: boolean,
    ) {
      return this.administracionService.updateSolicitudStatus(id, status);
    }
  }