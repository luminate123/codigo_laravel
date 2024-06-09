import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';

@Controller('api/services')
export class ServicesController {
    constructor(private ServicesService: ServicesService) { }

    @Get()
    getUsers() {
        return this.ServicesService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id',ParseIntPipe) id: number): Promise<Service>{
        return this.ServicesService.getUser(id)
    }



}
