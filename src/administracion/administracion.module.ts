import { Module } from "@nestjs/common";
import { AdministracionController } from "./administracion.controller";
import { User } from "src/Entities/User.entity";
import { Unidad } from "src/Entities/Unidad.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdministracionService } from "./administracion.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Unidad])],
    controllers: [AdministracionController],
    providers: [AdministracionService],
    exports: [],
})
export class AdministracionModule {}