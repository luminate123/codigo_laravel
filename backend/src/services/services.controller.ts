import { Controller, Get, Param, ParseIntPipe, Post, Body, BadRequestException, Delete, Patch, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ServicesService } from './services.service';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('api/services')
export class ServicesController {
    constructor(private ServicesService: ServicesService) { }

    @Post()
    @UseInterceptors(
        FileInterceptor('file', {
            storage: diskStorage({
                destination: './uploads',  // Asegúrate de que esta ruta sea correcta
                filename: (req, file, callback) => {
                    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
                    const ext = extname(file.originalname);
                    callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
                },
            }),
        }),
    )
    async createService(@Body() newService: CreateServiceDto, @UploadedFile() image: Express.Multer.File): Promise<Service> {
        try {
            if (image) {
                newService.imagen = image.path;  // Asumiendo que tienes un campo `imagePath` en tu DTO y entidad
            }
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
    async getUser(@Param('id', ParseIntPipe) id: number): Promise<Service> {
        const service = await this.ServicesService.getUser(id)

        return { ...service, imagen: `http://localhost:3000/${service.imagen}` };

    }

    @Delete(':id')
    deleteService(@Param('id', ParseIntPipe) id: number) {
        return this.ServicesService.deleteService(id)
    }

    @Patch(':id')
    @UseInterceptors(FileInterceptor('image', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const ext = extname(file.originalname);
                callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
            }
        })
    }))
    updateService(@Param('id', ParseIntPipe) id: number, @Body() service: UpdateServiceDto, @UploadedFile() image: Express.Multer.File) {
        if (image) {
            service.imagen = image.path;  // Asumiendo que tienes un campo `imagePath` en tu DTO y entidad
        }
        return this.ServicesService.updateService(id, service);
    }
}
