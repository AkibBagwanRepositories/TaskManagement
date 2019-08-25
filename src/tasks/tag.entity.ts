import { BaseEntity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, Entity } from "typeorm";

@Entity('tag')
export class TagEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
}