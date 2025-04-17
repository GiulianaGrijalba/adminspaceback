import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../Entities/User.entity';
import { Unidad } from '../Entities/Unidad.entity';
import { Servicios } from '../Entities/Servicios.entity';
import { Notificaciones } from '../Entities/Notificaciones.entity';
import { Solicitud } from '../Entities/Solicitud.entity';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { StatusService } from '../Complementos/enum.StatusService';
import { UserRole } from '../Complementos/enum.Role';

@Injectable()
export class AdministracionService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    
    @InjectRepository(Unidad)
    private unidadRepository: Repository<Unidad>,
    
    @InjectRepository(Servicios)
    private serviciosRepository: Repository<Servicios>,
    
    @InjectRepository(Notificaciones)
    private notificacionesRepository: Repository<Notificaciones>,
    
    @InjectRepository(Solicitud)
    private solicitudRepository: Repository<Solicitud>,
  ) {}

  // Gestión de Usuarios
  async getAllUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: string) {
    const user = await this.userRepository.findOne({
      where: { IdUser: id },
      relations: ['unidades'],
    });
    
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    
    return user;
  }

  async getPropietarios() {
    return this.userRepository.find({
      where: { Role: UserRole.PROPIETARIO },
      relations: ['unidades'],
    });
  }

  async getInquilinos() {
    return this.userRepository.find({
      where: { Role: UserRole.INQUILINO },
    });
  }

  // Gestión de Unidades
  async getAllUnidades() {
    return this.unidadRepository.find({
      relations: ['Propietario', 'inquilino', 'servicios'],
    });
  }

  async getUnidadById(id: string) {
    const unidad = await this.unidadRepository.findOne({
      where: { idUnidad: id },
      relations: ['Propietario', 'inquilino', 'servicios'],
    });
    
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }
    
    return unidad;
  }

  async createUnidad(createUnidadDto: CreateUnidadDto) {
    const { propietarioId, inquilinoId, ...unidadData } = createUnidadDto;
    
    const propietario = await this.userRepository.findOne({
      where: { IdUser: propietarioId },
    });
    
    if (!propietario) {
      throw new NotFoundException(`Propietario con ID ${propietarioId} no encontrado`);
    }
    
    let inquilino: User | null = null;
    if (inquilinoId) {
      const inquilinoFound = await this.userRepository.findOne({
        where: { IdUser: inquilinoId },
      });
      
      if (!inquilinoFound) {
        throw new NotFoundException(`Inquilino con ID ${inquilinoId} no encontrado`);
      }
      
      inquilino = inquilinoFound;
    }
    
    const newUnidad = this.unidadRepository.create({
      ...unidadData,
      Propietario: propietario,
      inquilino,
    } as any);
    
    return this.unidadRepository.save(newUnidad);
  }

  async updateUnidad(id: string, updateUnidadDto: Partial<CreateUnidadDto>) {
    const unidad = await this.getUnidadById(id);
    
    if (updateUnidadDto.propietarioId) {
      const propietario = await this.userRepository.findOne({
        where: { IdUser: updateUnidadDto.propietarioId },
      });
      
      if (!propietario) {
        throw new NotFoundException(`Propietario con ID ${updateUnidadDto.propietarioId} no encontrado`);
      }
      
      unidad.Propietario = propietario;
    }
    
    if (updateUnidadDto.inquilinoId) {
      const inquilino = await this.userRepository.findOne({
        where: { IdUser: updateUnidadDto.inquilinoId },
      });
      
      if (!inquilino) {
        throw new NotFoundException(`Inquilino con ID ${updateUnidadDto.inquilinoId} no encontrado`);
      }
      
      unidad.inquilino = inquilino;
    } else if (updateUnidadDto.inquilinoId === null) {
      unidad.inquilino = null as any;
    }
    
    if (updateUnidadDto.Adress) {
      unidad.Adress = updateUnidadDto.Adress;
    }
    
    return this.unidadRepository.save(unidad);
  }

  async removeUnidad(id: string) {
    const unidad = await this.getUnidadById(id);
    return this.unidadRepository.remove(unidad);
  }

  // Gestión de Servicios
  async getAllServicios() {
    return this.serviciosRepository.find({
      relations: ['unidadServicios'],
    });
  }

  async getServicioById(id: string) {
    const servicio = await this.serviciosRepository.findOne({
      where: { IdServicio: id },
      relations: ['unidadServicios'],
    });
    
    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    
    return servicio;
  }

  async createServicio(createServicioDto: CreateServicioDto) {
    const { unidadId, ...servicioData } = createServicioDto;
    
    const unidad = await this.unidadRepository.findOne({
      where: { idUnidad: unidadId },
    });
    
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${unidadId} no encontrada`);
    }
    
    const newServicio = this.serviciosRepository.create({
      ...servicioData,
      status: StatusService.PENDIENTE,
    });
    
    const savedServicio = await this.serviciosRepository.save(newServicio);
    
    // Asociar el servicio con la unidad
    unidad.servicios = savedServicio;
    await this.unidadRepository.save(unidad);
    
    return savedServicio;
  }

  async updateServicio(id: string, updateServicioDto: UpdateServicioDto) {
    const servicio = await this.getServicioById(id);
    
    const updatedServicio = Object.assign(servicio, updateServicioDto);
    return this.serviciosRepository.save(updatedServicio);
  }

  async removeServicio(id: string) {
    const servicio = await this.getServicioById(id);
    return this.serviciosRepository.remove(servicio);
  }

  // Gestión de Notificaciones
  async getAllNotificaciones() {
    return this.notificacionesRepository.find();
  }

  async getNotificacionById(id: string) {
    const notificacion = await this.notificacionesRepository.findOne({
      where: { idNotificacion: id },
    });
    
    if (!notificacion) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }
    
    return notificacion;
  }

  async createNotificacion(createNotificacionDto: CreateNotificacionDto) {
    const newNotificacion = this.notificacionesRepository.create({
      ...createNotificacionDto,
      date: new Date(),
      status: false,
    });
    
    return this.notificacionesRepository.save(newNotificacion);
  }

  async markNotificacionAsRead(id: string) {
    const notificacion = await this.getNotificacionById(id);
    
    notificacion.status = true;
    return this.notificacionesRepository.save(notificacion);
  }

  async removeNotificacion(id: string) {
    const notificacion = await this.getNotificacionById(id);
    return this.notificacionesRepository.remove(notificacion);
  }

  // Gestión de Solicitudes
  async getAllSolicitudes() {
    return this.solicitudRepository.find();
  }

  async getSolicitudById(id: string) {
    const solicitud = await this.solicitudRepository.findOne({
      where: { idSolicitud: id },
    });
    
    if (!solicitud) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    
    return solicitud;
  }

  async updateSolicitudStatus(id: string, status: boolean) {
    const solicitud = await this.getSolicitudById(id);
    
    solicitud.status = status;
    return this.solicitudRepository.save(solicitud);
  }
}