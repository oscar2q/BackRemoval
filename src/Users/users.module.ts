/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clientes } from 'src/Entitys/Cliente.entity';


@Module({
    imports:[ TypeOrmModule.forFeature([ clientes ]) ],
    providers: [UsersService],
    controllers:[ UsersController ]
})
export class UsersModule {}
