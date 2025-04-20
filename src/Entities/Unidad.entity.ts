import { User } from "./User.entity";
import { Servicios } from "./Servicios.entity";

// Interfaz actualizada para coincidir con la estructura de Supabase
export interface Unidad {
    idUnidad: string;
    Adress: string;
    propietarioIdUser: string; // ID del propietario (nombre de columna en Supabase)
    inquilinoIdUser?: string | null; // ID del inquilino (nombre de columna en Supabase)
    serviciosIdServicio?: string | null; // ID del servicio (nombre de columna en Supabase)
    
    // Propiedades virtuales para objetos relacionados (no están en la tabla real)
    propietario?: User; 
    inquilino?: User | null;
    servicios?: Servicios[] | null;
}