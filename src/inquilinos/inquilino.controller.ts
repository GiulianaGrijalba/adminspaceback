import { Controller } from "@nestjs/common";
import { InquilinoService } from "./inquilino.service";

@Controller('inquilino')
export class InquilinoController {
    constructor(private readonly inquilinoService: InquilinoService) {}

 
}