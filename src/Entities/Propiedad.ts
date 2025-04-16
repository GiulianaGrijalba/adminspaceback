import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

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
}