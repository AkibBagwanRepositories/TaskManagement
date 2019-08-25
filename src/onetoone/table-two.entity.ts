import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn } from "typeorm";
import { TableOne } from "./table-one.entity";

@Entity('tabletwo')
export class TableTwo extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;
}