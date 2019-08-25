import { Injectable } from '@nestjs/common';
import { TableOne } from './table-one.entity';
import { tableOneDto, tableTwoDto } from './table-one.dto';
import { TableTwo } from './table-two.entity';
import { TableOneRepository } from './table-one.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { TableTwoRepository } from './table-two.repository';

@Injectable()
export class OnetooneService {
    constructor(
        @InjectRepository(TableOneRepository)
        private tableOneRepository:TableOneRepository,
        @InjectRepository(TableTwoRepository)
        private tableTwoRepository:TableTwoRepository
    ){}

    async getAll() {
        return await this.tableOneRepository.find({relations:['two']});
    }
    async createFromTableOne(dto:tableOneDto):Promise<any>{
        let data = new TableOne();
        data.name = dto.name;
        data.two = dto.two;
        return await this.tableOneRepository.save(data);
    }
    
    async createFromTableTwo(dto:tableTwoDto):Promise<any>{
        let data = new TableTwo();
        data.name = dto.name;
        return await this.tableTwoRepository.save(data);
    }
}
