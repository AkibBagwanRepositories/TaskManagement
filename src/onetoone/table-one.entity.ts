import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, OneToOne, JoinTable, JoinColumn } from "typeorm";
import { TableTwo } from "./table-two.entity";

@Entity('tableone')
export class TableOne extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    name:string;

    @OneToOne(type=>TableTwo)
    @JoinColumn()
    two:TableTwo;
}