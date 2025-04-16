import { StatusService } from "src/Complementos/enum.StatusService";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Servicios {
    @PrimaryGeneratedColumn('uuid')
    IdServicio: string;

    @Column()
    name:string

    @Column()
    description:string

    @Column()
    price:number

    @Column()
    type:string

    @Column({
        type: 'enum',
        enum: StatusService,
        default: StatusService.PENDIENTE
    })
    status:string
    @Column()
    createdAt:Date

    @Column()
    updatedAt:Date
}