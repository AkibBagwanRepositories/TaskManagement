import { BaseEntity, PrimaryGeneratedColumn, Column, Entity, OneToOne } from "typeorm";

@Entity('subtask')
export class Subtask extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:string;
    @Column()
    name:string;
}