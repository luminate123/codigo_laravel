import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServicesModule } from './services/services.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactoService } from './contacto/contacto.service';
import { ContactoModule } from './contacto/contacto.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'laravel',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    ServicesModule,
    ContactoModule
    ],
  controllers: [AppController],
  providers: [AppService, ContactoService],
})
export class AppModule { }
