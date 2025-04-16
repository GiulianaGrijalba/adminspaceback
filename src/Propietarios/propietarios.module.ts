import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unidad } from "src/Entities/Propiedad";
import { User } from "src/Entities/User";
import { PropietariosController } from "./propietarios.controller";
import { PropietariosService } from "./propietarios.service";

@Module({
    imports: [TypeOrmModule.forFeature([User, Unidad])],
    controllers: [PropietariosController],
    providers: [PropietariosService],
    exports: [PropietariosService]
})
export class PropietariosModule {}