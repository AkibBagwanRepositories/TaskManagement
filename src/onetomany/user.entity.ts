import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToMany, JoinTable } from "typeorm";
import { ActivityEntity } from "./activity.entity";

@Entity('users')
export class UserEntity extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    name:string;

    @OneToMany(type=>ActivityEntity,activites=>activites.user)
    @JoinTable()
    activities:ActivityEntity[];
}