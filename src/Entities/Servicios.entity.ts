import { StatusService } from "src/Complementos/enum.StatusService";
import { Unidad } from "./Unidad.entity";

// Convertido a interface desde la entidad TypeORM
export interface Servicios {
    IdServicio: string;
    name: string;
    description: string;
    price: number;
    status: StatusService;
    unidadServicios?: Unidad; // Relación con Unidad (opcional para flexibilidad)
}