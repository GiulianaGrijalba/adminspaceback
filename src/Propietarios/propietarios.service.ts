import { Injectable, Inject } from "@nestjs/common";
import { SupabaseClient } from '@supabase/supabase-js';
import { Unidad } from "src/Entities/Unidad.entity";
import { User } from "src/Entities/User.entity";

@Injectable()
export class PropietariosService {
    
    constructor(
        @Inject('SUPABASE_CLIENT')
        private supabase: SupabaseClient
    ) {}

    async updatePropietario(id: string, updateDto: any) {
        const { data, error } = await this.supabase
            .from('user')
            .update(updateDto)
            .eq('IdUser', id);
        
        if (error) throw error;
        return data;
    }
    
    async deletePropietario(id: string) {
        const { error } = await this.supabase
            .from('user')  // Asegúrate de que este es el nombre correcto de la tabla en Supabase
            .delete()
            .eq('IdUser', id);
        
        if (error) throw error;
        return { success: true };
    }
}