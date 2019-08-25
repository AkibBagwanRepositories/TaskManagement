import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('activity')
export class ActivityEntity extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;
    
    @ManyToOne(type=>ActivityEntity)
    @JoinTable()
    user:UserEntity;
}