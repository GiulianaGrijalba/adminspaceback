import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Servicios } from "./Servicios";

@Entity()
export class Unidad {
 
@PrimaryGeneratedColumn('uuid')
idUnidad: string;

@Column()
Adress: string

@ManyToOne(()=> User, (user)=> user.unidades)
Propietario: User;

@ManyToOne(()=> User, {nullable:true})
inquilino: User

@OneToOne(()=> Servicios, (servicio)=> servicio.unidadServicios)
servicios: Servicios
}