import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unidad } from "src/Entities/Unidad.entity";
import { User } from "src/Entities/User.entity";
import { PropietariosController } from "./propietarios.controller";
import { PropietariosService } from "./propietarios.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Unidad])],
    controllers: [PropietariosController],
    providers: [PropietariosService],
    exports: [PropietariosService]
})
export class PropietariosModule {}