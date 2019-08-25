import { BaseEntity,JoinColumn, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Task } from "./task.entity";

@Entity('attachment')
export class AttachmentEntity extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    id:string;

    @Column()
    name:string;

    @Column()
    type:string;

    @ManyToOne(type=>Task,OneTask=>OneTask.att)
    @JoinColumn()
    task:Task;
}