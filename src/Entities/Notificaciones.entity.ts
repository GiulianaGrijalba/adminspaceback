import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notificaciones {
    @PrimaryGeneratedColumn('uuid')
    idNotificacion: string;


    @Column({
        type: 'enum',
        enum: DestinatarioNotificacion,
        default: DestinatarioNotificacion.ADMIN
    })
    destinatarios: DestinatarioNotificacion;

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
}