import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Unidad } from "src/Entities/Propiedad";
import { User } from "src/Entities/User";
import { InquilinoService } from "./inquilino.service";
import { InquilinoController } from "./inquilino.controller";

@Module({
    imports: [TypeOrmModule.forFeature([User, Unidad])],
    controllers: [InquilinoController],
    providers: [InquilinoService],
    exports: [InquilinoService],
})
export class InquilinoModule {}