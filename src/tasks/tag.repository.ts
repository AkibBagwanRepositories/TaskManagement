import { TagEntity } from "./tag.entity";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(TagEntity)
export class TagRepository extends Repository<TagEntity>{
}