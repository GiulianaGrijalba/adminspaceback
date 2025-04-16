import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Solicitud {
    @PrimaryGeneratedColumn('uuid')
    idSolicitud: string;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({
        default:false
    })
    status: boolean;

    @Column()
    date: Date;

    @Column({type: 'enum',
        enum: DestinatarioNotificacion,
        default: DestinatarioNotificacion.ADMIN
    })
    destinatarios: DestinatarioNotificacion;
}