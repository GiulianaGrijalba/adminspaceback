// import { StatusService } from "src/Complementos/enum.StatusService";
// import { Unidad } from "./Unidad.entity";

// // Convertido a interface desde la entidad TypeORM
// export interface Servicios {
//     IdServicio: string;
//     name: string;
//     description: string;
//     price: number;
//     status: StatusService;
//     unidadServicios?: Unidad; // Relación con Unidad (opcional para flexibilidad)
// }

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { StatusService } from "src/Complementos/enum.StatusService";
import { Unidad } from "./Unidad.entity";

@Entity({ name: "servicios" })
export class Servicios {
    @PrimaryGeneratedColumn("uuid")
    IdServicio: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column("decimal") // Asegúrate de que el tipo de dato sea correcto
    price: number;

    @Column()
    status: StatusService;

    @ManyToOne(() => Unidad, (unidad) => unidad.servicios, { nullable: true })
    unidadServicios?: Unidad; // Relación con Unidad (opcional)
}