import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { CreateUnidadDto } from './dto/create-unidad.dto';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { StatusService } from '../Complementos/enum.StatusService';
import { UserRole } from '../Complementos/enum.Role';

@Injectable()
export class AdministracionService {
  constructor(
    @Inject('SUPABASE_CLIENT')
    private supabase: SupabaseClient
  ) {}

  // Gestión de Usuarios
  async getAllUsers() {
    const { data, error } = await this.supabase
      .from('user')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getUserById(id: string) {
    // Obtener usuario
    const { data: user, error: userError } = await this.supabase
      .from('user')
      .select('*')
      .eq('IdUser', id)
      .single();
    
    if (userError) throw userError;
    if (!user) {
      throw new NotFoundException(`Usuario con ID ${id} no encontrado`);
    }
    
    // Obtener unidades relacionadas
    const { data: unidades, error: unidadesError } = await this.supabase
      .from('unidad')
      .select('*')
      .eq('propietarioIdUser', id);  // Cambiado: Propietario -> propietarioIdUser
    
    if (unidadesError) throw unidadesError;
    
    return { ...user, unidades };
  }

  async getPropietarios() {
    // Obtener propietarios
    const { data: propietarios, error: propietariosError } = await this.supabase
      .from('user')
      .select('*')
      .eq('Role', UserRole.PROPIETARIO);
    
    if (propietariosError) throw propietariosError;
    
    // Para cada propietario, obtener sus unidades
    const propietariosWithUnidades = await Promise.all(
      propietarios.map(async (propietario) => {
        const { data: unidades, error: unidadesError } = await this.supabase
          .from('unidad')
          .select('*')
          .eq('propietarioIdUser', propietario.IdUser);  // Cambiado: Propietario -> propietarioIdUser
        
        if (unidadesError) throw unidadesError;
        
        return { ...propietario, unidades };
      })
    );
    
    return propietariosWithUnidades;
  }

  async getInquilinos() {
    const { data, error } = await this.supabase
      .from('user')
      .select('*')
      .eq('Role', UserRole.INQUILINO);
    
    if (error) throw error;
    return data;
  }

  // Gestión de Unidades
  async getAllUnidades() {
    const { data: unidades, error: unidadesError } = await this.supabase
      .from('unidad')
      .select('*');
    
    if (unidadesError) throw unidadesError;
    
    // Para cada unidad, obtener datos relacionados
    const unidadesWithRelations = await Promise.all(
      unidades.map(async (unidad) => {
        // Obtener propietario
        const { data: propietario, error: propietarioError } = await this.supabase
          .from('user')
          .select('*')
          .eq('IdUser', unidad.propietarioIdUser)  // Cambiado: Propietario -> propietarioIdUser
          .single();
        
        if (propietarioError && propietarioError.code !== 'PGRST116') throw propietarioError;
        
        // Obtener inquilino si existe
        let inquilino = null;
        if (unidad.inquilinoIdUser) {  // Cambiado: inquilino -> inquilinoIdUser
          const { data: inquilinoData, error: inquilinoError } = await this.supabase
            .from('user')
            .select('*')
            .eq('IdUser', unidad.inquilinoIdUser)  // Cambiado: inquilino -> inquilinoIdUser
            .single();
          
          if (inquilinoError && inquilinoError.code !== 'PGRST116') throw inquilinoError;
          inquilino = inquilinoData;
        }
        
        // Obtener servicios
        const { data: servicios, error: serviciosError } = await this.supabase
          .from('servicios')
          .select('*')
          .eq('unidadServicios', unidad.idUnidad);
        
        if (serviciosError) throw serviciosError;
        
        return {
          ...unidad,
          propietario: propietario || null,  // Cambiado el nombre para mantener consistencia
          inquilino,
          servicios: servicios || []
        };
      })
    );
    
    return unidadesWithRelations;
  }

  async getUnidadById(id: string) {
    // Obtener unidad
    const { data: unidad, error: unidadError } = await this.supabase
      .from('unidad')
      .select('*')
      .eq('idUnidad', id)
      .single();
    
    if (unidadError) throw unidadError;
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }
    
    // Obtener propietario
    const { data: propietario, error: propietarioError } = await this.supabase
      .from('user')
      .select('*')
      .eq('IdUser', unidad.propietarioIdUser)  // Cambiado: Propietario -> propietarioIdUser
      .single();
    
    if (propietarioError && propietarioError.code !== 'PGRST116') throw propietarioError;
    
    // Obtener inquilino si existe
    let inquilino = null;
    if (unidad.inquilinoIdUser) {  // Cambiado: inquilino -> inquilinoIdUser
      const { data: inquilinoData, error: inquilinoError } = await this.supabase
        .from('user')
        .select('*')
        .eq('IdUser', unidad.inquilinoIdUser)  // Cambiado: inquilino -> inquilinoIdUser
        .single();
      
      if (inquilinoError && inquilinoError.code !== 'PGRST116') throw inquilinoError;
      inquilino = inquilinoData;
    }
    
    // Obtener servicios
    const { data: servicios, error: serviciosError } = await this.supabase
      .from('servicios')
      .select('*')
      .eq('unidadServicios', id);
    
    if (serviciosError) throw serviciosError;
    
    return {
      ...unidad,
      propietario: propietario || null,  // Cambiado el nombre para mantener consistencia
      inquilino,
      servicios: servicios || []
    };
  }

  async createUnidad(createUnidadDto: CreateUnidadDto) {
    const { propietarioId, inquilinoId, ...unidadData } = createUnidadDto;
    
    // Verificar que el propietario existe
    const { data: propietario, error: propietarioError } = await this.supabase
      .from('user')
      .select('*')
      .eq('IdUser', propietarioId)
      .single();
    
    if (propietarioError) throw propietarioError;
    if (!propietario) {
      throw new NotFoundException(`Propietario con ID ${propietarioId} no encontrado`);
    }
    
    // Verificar que el inquilino existe si se proporciona
    let inquilino = null;
    if (inquilinoId) {
      const { data: inquilinoData, error: inquilinoError } = await this.supabase
        .from('user')
        .select('*')
        .eq('IdUser', inquilinoId)
        .single();
      
      if (inquilinoError) throw inquilinoError;
      if (!inquilinoData) {
        throw new NotFoundException(`Inquilino con ID ${inquilinoId} no encontrado`);
      }
      
      inquilino = inquilinoData;
    }
    
    // Crear la unidad
    const newUnidad = {
      ...unidadData,
      propietarioIdUser: propietarioId,  // Cambiado: Propietario -> propietarioIdUser
      inquilinoIdUser: inquilinoId || null  // Cambiado: inquilino -> inquilinoIdUser
    };
    
    const { data, error } = await this.supabase
      .from('unidad')
      .insert(newUnidad)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateUnidad(id: string, updateUnidadDto: Partial<CreateUnidadDto>) {
    // Verificar que la unidad existe
    const { data: unidad, error: unidadError } = await this.supabase
      .from('unidad')
      .select('*')
      .eq('idUnidad', id)
      .single();
    
    if (unidadError) throw unidadError;
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${id} no encontrada`);
    }
    
    const updateData: any = {};
    
    if (updateUnidadDto.propietarioId) {
      // Verificar que el propietario existe
      const { data: propietario, error: propietarioError } = await this.supabase
        .from('user')
        .select('*')
        .eq('IdUser', updateUnidadDto.propietarioId)
        .single();
      
      if (propietarioError) throw propietarioError;
      if (!propietario) {
        throw new NotFoundException(`Propietario con ID ${updateUnidadDto.propietarioId} no encontrado`);
      }
      
      updateData.propietarioIdUser = updateUnidadDto.propietarioId;  // Cambiado: Propietario -> propietarioIdUser
    }
    
    if (updateUnidadDto.inquilinoId) {
      // Verificar que el inquilino existe
      const { data: inquilino, error: inquilinoError } = await this.supabase
        .from('user')
        .select('*')
        .eq('IdUser', updateUnidadDto.inquilinoId)
        .single();
      
      if (inquilinoError) throw inquilinoError;
      if (!inquilino) {
        throw new NotFoundException(`Inquilino con ID ${updateUnidadDto.inquilinoId} no encontrado`);
      }
      
      updateData.inquilinoIdUser = updateUnidadDto.inquilinoId;  // Cambiado: inquilino -> inquilinoIdUser
    } else if (updateUnidadDto.inquilinoId === null) {
      updateData.inquilinoIdUser = null;  // Cambiado: inquilino -> inquilinoIdUser
    }
    
    if (updateUnidadDto.Adress) {
      updateData.Adress = updateUnidadDto.Adress;
    }
    
    // Actualizar la unidad
    const { data, error } = await this.supabase
      .from('unidad')
      .update(updateData)
      .eq('idUnidad', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async removeUnidad(id: string) {
    const { error } = await this.supabase
      .from('unidad')
      .delete()
      .eq('idUnidad', id);
    
    if (error) throw error;
    return { success: true };
  }

  // Gestión de Servicios
  async getAllServicios() {
    const { data, error } = await this.supabase
      .from('servicios')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getServicioById(id: string) {
    const { data, error } = await this.supabase
      .from('servicios')
      .select('*')
      .eq('IdServicio', id)
      .single();
    
    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }
    
    return data;
  }

  async createServicio(createServicioDto: CreateServicioDto) {
    const { unidadId, ...servicioData } = createServicioDto;
    
    // Verificar que la unidad existe
    const { data: unidad, error: unidadError } = await this.supabase
      .from('unidad')
      .select('*')
      .eq('idUnidad', unidadId)
      .single();
    
    if (unidadError) throw unidadError;
    if (!unidad) {
      throw new NotFoundException(`Unidad con ID ${unidadId} no encontrada`);
    }
    
    // Crear servicio
    const newServicio = {
      ...servicioData,
      status: StatusService.PENDIENTE,
      unidadServicios: unidadId
    };
    
    const { data, error } = await this.supabase
      .from('servicios')
      .insert(newServicio)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateServicio(id: string, updateServicioDto: UpdateServicioDto) {
    const { data, error } = await this.supabase
      .from('servicios')
      .update(updateServicioDto)
      .eq('IdServicio', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async removeServicio(id: string) {
    const { error } = await this.supabase
      .from('servicios')
      .delete()
      .eq('IdServicio', id);
    
    if (error) throw error;
    return { success: true };
  }

  // Gestión de Notificaciones
  async getAllNotificaciones() {
    const { data, error } = await this.supabase
      .from('notificaciones')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getNotificacionById(id: string) {
    const { data, error } = await this.supabase
      .from('notificaciones')
      .select('*')
      .eq('idNotificacion', id)
      .single();
    
    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Notificación con ID ${id} no encontrada`);
    }
    
    return data;
  }

  async createNotificacion(createNotificacionDto: CreateNotificacionDto) {
    const newNotificacion = {
      ...createNotificacionDto,
      date: new Date(),
      status: false
    };
    
    const { data, error } = await this.supabase
      .from('notificaciones')
      .insert(newNotificacion)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async markNotificacionAsRead(id: string) {
    const { data, error } = await this.supabase
      .from('notificaciones')
      .update({ status: true })
      .eq('idNotificacion', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }

  async removeNotificacion(id: string) {
    const { error } = await this.supabase
      .from('notificaciones')
      .delete()
      .eq('idNotificacion', id);
    
    if (error) throw error;
    return { success: true };
  }

  // Gestión de Solicitudes
  async getAllSolicitudes() {
    const { data, error } = await this.supabase
      .from('solicitud')
      .select('*');
    
    if (error) throw error;
    return data;
  }

  async getSolicitudById(id: string) {
    const { data, error } = await this.supabase
      .from('solicitud')
      .select('*')
      .eq('idSolicitud', id)
      .single();
    
    if (error) throw error;
    if (!data) {
      throw new NotFoundException(`Solicitud con ID ${id} no encontrada`);
    }
    
    return data;
  }

  async updateSolicitudStatus(id: string, status: boolean) {
    const { data, error } = await this.supabase
      .from('solicitud')
      .update({ status })
      .eq('idSolicitud', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  }
}