import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unidad } from "src/Entities/Unidad.entity";
import { User } from "src/Entities/User.entity";
import { InquilinoService } from "./inquilino.service";
import { InquilinoController } from "./inquilino.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Unidad])],
    controllers: [InquilinoController],
    providers: [InquilinoService],
    exports: [InquilinoService],
})
export class InquilinoModule {}