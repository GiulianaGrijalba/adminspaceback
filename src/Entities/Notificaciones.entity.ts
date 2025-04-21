// import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";

import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";

// // Convertido a interface desde la entidad TypeORM
// export interface Notificaciones {
//     idNotificacion: string;
//     destinatarios: DestinatarioNotificacion;
//     title: string;
//     description: string;
//     status: boolean;
//     date: Date;
// }

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "notificaciones" })
export class Notificacion {
    @PrimaryGeneratedColumn("uuid")
    idNotificacion: string;

    @Column()
    destinatarios: DestinatarioNotificacion;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    status: boolean;

    @Column()
    date: Date;

    // Puedes agregar métodos aquí si es necesario
    markAsRead() {
        this.status = true;
    }

    // Otros métodos que necesites
}