/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { clientes } from './Entitys/Cliente.entity';
import { UsersModule } from './Users/users.module';


@Module({
  imports: [
    UsersModule,
   TypeOrmModule.forRoot({
              type:'postgres',
              host:'localhost',
              port:5432,
              username:'postgres',
              password:'This_is_very_big_shit1.8._2@',
              database:'Practices_Tienda_Removal',
              entities:[clientes],
              synchronize:true,/*poner false en produccion*/
              retryAttempts:10,
              retryDelay:6000,
              autoLoadEntities:true
            }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
