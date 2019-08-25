import { Injectable } from "@nestjs/common";
import { TagRepository } from "./tag.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TagDto } from "./tag.dto";
import { TagEntity } from "./tag.entity";

@Injectable()
export class TagService {
    constructor(@InjectRepository(TagRepository)
    private tagRepository:TagRepository){}

    createTag(tag:TagDto):Promise<TagEntity>{
        return this.tagRepository.save(tag);
    }
    
    getAllTag():Promise<TagEntity[]>{
        return this.tagRepository.find();
    }
}