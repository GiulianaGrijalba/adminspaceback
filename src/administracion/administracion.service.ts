import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRole } from "src/Complementos/enum.Role";
import { Unidad } from "src/Entities/Propiedad";
import { User } from "src/Entities/User";
import { Repository } from "typeorm";

@Injectable()
export class AdministracionService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Unidad) private unidadRepository: Repository<Unidad>
    ){}

    async findAll(){
        const users = await this.userRepository.find()

        const propietarios=  users.filter(user=> user.Role === UserRole.PROPIETARIO)
        const inquilinos=  users.filter(user=> user.Role === UserRole.INQUILINO)

        return {propietarios, inquilinos}
    }
}