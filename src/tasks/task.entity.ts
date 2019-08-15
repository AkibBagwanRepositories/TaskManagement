import { BaseEntity, Entity, PrimaryColumn, PrimaryGeneratedColumn, Column } from "typeorm";
import { TaskStatus } from "./task-status.enum";

@Entity()
export class Task extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;
    
    @Column()
    descriprion: string;
    
    @Column()
    status: TaskStatus;
}