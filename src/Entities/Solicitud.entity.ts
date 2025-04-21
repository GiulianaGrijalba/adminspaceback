// import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";

// // Convertido a interface desde la entidad TypeORM
// export interface Solicitud {
//     idSolicitud: string;
//     title: string;
//     description: string;
//     status: boolean;
//     date: Date;
//     destinatarios: DestinatarioNotificacion;
// }


import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";

@Entity({ name: "solicitudes" })
export class Solicitud {
    @PrimaryGeneratedColumn("uuid")
    idSolicitud: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    status: boolean;

    @Column()
    date: Date;

    @Column()
    destinatarios: DestinatarioNotificacion; // Asegúrate de que este tipo sea compatible
}