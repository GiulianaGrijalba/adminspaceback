import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";
import { Servicios } from "./Servicios.entity";

@Entity()
export class Unidad {
 
@PrimaryGeneratedColumn('uuid')
idUnidad: string;

@Column()
Adress: string

@ManyToOne(()=> User, (user)=> user.unidades)
Propietario: User;

@ManyToOne(()=> User, { nullable: true })
inquilino: User | null;

@OneToOne(()=> Servicios, (servicio)=> servicio.unidadServicios)
@JoinColumn()
servicios: Servicios
}