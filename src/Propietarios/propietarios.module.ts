import { Module } from "@nestjs/common";
import { PropietariosController } from "./propietarios.controller";
import { PropietariosService } from "./propietarios.service";
import { SupabaseModule } from '../config/supabase.module';

@Module({
    imports: [SupabaseModule],
    controllers: [PropietariosController],
    providers: [PropietariosService],
    exports: [PropietariosService]
})  
export class PropietariosModule {}