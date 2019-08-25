import { Controller, Get, Post, Body } from '@nestjs/common';
import { OnetooneService } from './onetoone.service';
import { tableOneDto, tableTwoDto } from './table-one.dto';

@Controller('onetoone')
export class OnetooneController {
    constructor(
        private readonly  onetooneService:OnetooneService
    ){}

    @Get()
    getOneToOneAll(){
        return this.onetooneService.getAll();
    }
    @Post('/onetotwo')
    createOneToOneFromTableOneToTwo(@Body() onetotwo:tableOneDto){
        return this.onetooneService.createFromTableOne(onetotwo);
    }
    @Post('/twotoone')
    createOneToTwoFromTableTwoToOne(@Body() twotoone:tableTwoDto){
        return this.onetooneService.createFromTableTwo(twotoone);
    }
}
