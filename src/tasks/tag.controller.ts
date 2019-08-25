import { Controller, Post, Body, Get } from "@nestjs/common";
import { TagDto } from "./tag.dto";
import { TagEntity } from "./tag.entity";
import { TagService } from "./tag.service";

@Controller('tag')
export class TagController{

    constructor(
        private readonly tagService:TagService
    ){}
    @Post()
    createTag(@Body()tag:TagDto):Promise<TagEntity>{
        return this.tagService.createTag(tag);
    }
    
    @Get()
    getAllTag():Promise<TagEntity[]>{
        return this.tagService.getAllTag();
    }

}