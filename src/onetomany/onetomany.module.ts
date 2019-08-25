import { Module } from '@nestjs/common';
import { OnetomanyController } from './onetomany.controller';
import { OnetomanyService } from './onetomany.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityRepository } from './activity.repository';
import { UserRepository } from './user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([ActivityRepository,UserRepository])],
  controllers: [OnetomanyController],
  providers: [OnetomanyService]
})
export class OnetomanyModule {}
