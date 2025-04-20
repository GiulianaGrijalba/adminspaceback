import { DestinatarioNotificacion } from "src/Complementos/enum.Notificacion";

// Convertido a interface desde la entidad TypeORM
export interface Notificaciones {
    idNotificacion: string;
    destinatarios: DestinatarioNotificacion;
    title: string;
    description: string;
    status: boolean;
    date: Date;
}