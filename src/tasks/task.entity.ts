import {OneToOne, BaseEntity,  Entity,  PrimaryColumn,  PrimaryGeneratedColumn,  Column, JoinColumn, OneToMany, ManyToMany, JoinTable} from 'typeorm';
import { TaskStatus } from "./task-status.enum";
import { Subtask } from "./subtask.entity";
import { AttachmentEntity } from './attachment.entity';
import { TagEntity } from './tag.entity';

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

    @OneToOne(type => Subtask)
    @JoinColumn()
    sub: Subtask|null;

    @OneToMany(type=>AttachmentEntity,att=>att.task)
    @JoinColumn()
    att: AttachmentEntity[];

    @ManyToMany(type=>TagEntity)
    @JoinTable()
    tags!:TagEntity[];
}