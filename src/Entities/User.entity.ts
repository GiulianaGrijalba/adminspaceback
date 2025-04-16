import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserRole } from "src/Complementos/enum.Role";
import { Unidad } from "./Unidad.entity";

@Entity()
export class User {
 @PrimaryGeneratedColumn('uuid')
 IdUser: string 

 @Column()
 Name: string;

 @Column()
 LastName: string;

 @Column()
 Email: string;

 @Column()
 Phone: string

 @Column()
 Password: string;  

 @OneToMany(()=> Unidad, (unidad)=> unidad.Propietario)
 unidades: Unidad[];

 @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.INQUILINO
 })
 Role: UserRole;

} 