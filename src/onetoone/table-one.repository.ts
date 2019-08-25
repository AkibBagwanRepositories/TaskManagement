import { EntityRepository, Repository } from "typeorm";
import { TableOne } from "./table-one.entity";

@EntityRepository(TableOne)
export class TableOneRepository extends Repository<TableOne>{
}