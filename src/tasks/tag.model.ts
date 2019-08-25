import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagRepository } from './tag.repository';
import { TagController } from './tag.controller';
import { TagService } from './tag.service';

@Module({
  imports:[TypeOrmModule.forFeature([TagRepository])],/**I will inject all repository or module in respective module */
  controllers: [TagController],
  providers: [TagService],
})
export class TagModule {}
