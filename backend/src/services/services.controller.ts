import { Controller, Get, Param, ParseIntPipe, Post, Body,BadRequestException, Delete, Patch  } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Controller('api/services')
export class ServicesController {
    constructor(private ServicesService: ServicesService) { }

    @Post()
    async createService(@Body() newService: CreateServiceDto): Promise<Service> {
        try {
            return await this.ServicesService.createService(newService);
        } catch (error) {
            throw new BadRequestException(error.message);
        }
    }

    @Get()
    getUsers() {
        return this.ServicesService.getUsers()
    }

    @Get(':id')
    getUser(@Param('id', ParseIntPipe) id: number): Promise<Service> {
        return this.ServicesService.getUser(id)
    }

    @Delete(':id')
    deleteService(@Param('id', ParseIntPipe) id: number) {
        return this.ServicesService.deleteService(id)
    }

    @Patch(':id')
    updateService(@Param('id', ParseIntPipe) id: number, @Body() service: UpdateServiceDto) {
        return this.ServicesService.updateService(id, service)
    }

}
