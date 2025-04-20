// import { UserRole } from "src/Complementos/enum.Role";
// import { Unidad } from "./Unidad.entity";

// // Convertido a interface desde la entidad TypeORM
// export interface User {
//     IdUser: string;
//     Name: string;
//     LastName: string;
//     Email: string;
//     Phone: string;
//     Password: string;
//     unidades?: Unidad[]; // Array de unidades asociadas (opcional)
//     Role: UserRole;
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Unidad } from "./Unidad.entity";
import { UserRole } from "src/Complementos/enum.Role";

@Entity({ name: "users" })
export class User {
    @PrimaryGeneratedColumn("uuid")
    IdUser: string;

    @Column()
    Name: string;

    @Column()
    LastName: string;

    @Column()
    Email: string;

    @Column()
    Phone: string;

    @Column()
    Password: string;

    @OneToMany(() => Unidad, (unidad) => unidad.propietario, { nullable: true })
    unidades?: Unidad[]; // Array de unidades asociadas (opcional)

    @Column()
    Role: UserRole;
}
