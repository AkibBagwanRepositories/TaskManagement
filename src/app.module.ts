import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import {TypeOrmConfig} from './config/typeorm.config';
import { TagModule } from './tasks/tag.model';
import { OnetooneModule } from './onetoone/onetoone.module';
import { OnetomanyModule } from './onetomany/onetomany.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfig),TasksModule,TagModule, OnetooneModule, OnetomanyModule],
  controllers: [],
})
export class AppModule {}
