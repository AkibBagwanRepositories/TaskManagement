import { TableTwo } from "./table-two.entity";
import { TableOne } from "./table-one.entity";

export class tableOneDto{
    name:string;
    two:TableTwo;
}


export class tableTwoDto{
    name:string;
    one:TableOne;
}