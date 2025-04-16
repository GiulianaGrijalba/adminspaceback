import { StatusService } from "src/Complementos/enum.StatusService";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Unidad } from "./Propiedad";

@Entity()
export class Servicios {
    @PrimaryGeneratedColumn('uuid')
    IdServicio: string;

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    price:number

    @Column({
        type: 'enum',
        enum: StatusService,
        default: StatusService.PENDIENTE
    })
    status:StatusService

   @OneToOne(()=>Unidad, (unidad)=> unidad.servicios)
   unidadServicios: Unidad
}