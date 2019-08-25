import { Module } from '@nestjs/common';
import { OnetooneController } from './onetoone.controller';
import { OnetooneService } from './onetoone.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TableOneRepository } from './table-one.repository';
import { TableTwoRepository } from './table-two.repository';

@Module({
  imports:[TypeOrmModule.forFeature([TableOneRepository,TableTwoRepository])],
  controllers: [OnetooneController],
  providers: [OnetooneService]
})
export class OnetooneModule {}
