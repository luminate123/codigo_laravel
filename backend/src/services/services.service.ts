import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Service } from './service.entity';

@Injectable()
export class ServicesService {
    constructor(@InjectRepository(Service) private serviceRepository: Repository<Service>) { }

    getUsers() {
        return this.serviceRepository.find()
    }

    async getUser(id: number) {
        return this.serviceRepository.findOne({
            where: { id }
        })
    }

}
