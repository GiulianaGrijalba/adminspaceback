import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Unidad } from "src/Entities/Unidad.entity";
import { User } from "src/Entities/User.entity";
import { Repository } from "typeorm";

@Injectable()
export class InquilinoService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Unidad) private unidadRepository: Repository<Unidad>
    ) {}


}