import { UserRole } from "src/Complementos/enum.Role";
import { Unidad } from "./Unidad.entity";

// Convertido a interface desde la entidad TypeORM
export interface User {
    IdUser: string;
    Name: string;
    LastName: string;
    Email: string;
    Phone: string;
    Password: string;
    unidades?: Unidad[]; // Array de unidades asociadas (opcional)
    Role: UserRole;
}