import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";

// Convertido a interface desde la entidad TypeORM
export interface Solicitud {
    idSolicitud: string;
    title: string;
    description: string;
    status: boolean;
    date: Date;
    destinatarios: DestinatarioNotificacion;
}