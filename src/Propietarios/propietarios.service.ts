import { Injectable } from "@nestjs/common";
import { Unidad } from "src/Entities/Unidad.entity";
import { User } from "src/Entities/User.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class PropietariosService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Unidad) private unidadRepository: Repository<Unidad>
    ) {}
}