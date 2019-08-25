import { EntityRepository, Repository } from "typeorm";
import { TableTwo } from "./table-two.entity";

@EntityRepository(TableTwo)
export class TableTwoRepository extends Repository<TableTwo>{
}