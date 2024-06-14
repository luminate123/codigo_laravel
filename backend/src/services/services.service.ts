import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto'

@Injectable()
export class ServicesService {
    constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>) { }

    createService(service: CreateServiceDto) {
        if (!service.titulo || !service.descripcion) {
            throw new Error('Titulo y descripcion son requeridos')
        }
        const newService = this.serviceRepository.create(service)
        return this.serviceRepository.save(newService)
    }


    getUsers() {
        return this.serviceRepository.find()
    }

    async getUser(id: number) {
        return this.serviceRepository.findOne({
            where: { id }
        })
    }

}
