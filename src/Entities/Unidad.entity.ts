// import { User } from "./User.entity";
// import { Servicios } from "./Servicios.entity";

// // Interfaz actualizada para coincidir con la estructura de Supabase
// export interface Unidad {
//     idUnidad: string;
//     Adress: string;
//     propietarioIdUser: string; // ID del propietario (nombre de columna en Supabase)
//     inquilinoIdUser?: string | null; // ID del inquilino (nombre de columna en Supabase)
//     serviciosIdServicio?: string | null; // ID del servicio (nombre de columna en Supabase)
    
//     // Propiedades virtuales para objetos relacionados (no están en la tabla real)
//     propietario?: User; 
//     inquilino?: User | null;
//     servicios?: Servicios[] | null;
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User.entity";
import { Servicios } from "./Servicios.entity";

@Entity({ name: "unidades" })
export class Unidad {
    @PrimaryGeneratedColumn("uuid")
    idUnidad: string;

    @Column()
    Adress: string;

    @Column()
    propietarioIdUser: string; // ID del propietario

    @Column({ nullable: true })
    inquilinoIdUser ?: string | null; // ID del inquilino

    @Column({ nullable: true })
    serviciosIdServicio?: string | null; // ID del servicio

    @ManyToOne(() => User, (user) => user.unidades, { nullable: true })
    propietario?: User; 

    @ManyToOne(() => User, (user) => user.unidades, { nullable: true })
    inquilino?: User | null;

    @OneToMany(() => Servicios, (servicio) => servicio.unidadServicios, { nullable: true })
    servicios?: Servicios[] | null;
}