import { Module } from '@nestjs/common';
import { ServicesController } from './services.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Service } from './service.entity';
import { ServicesService } from './services.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forFeature([Service]),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads'
    }),
  ],
  controllers: [ServicesController],
  providers: [ServicesService],
})
export class ServicesModule { }
