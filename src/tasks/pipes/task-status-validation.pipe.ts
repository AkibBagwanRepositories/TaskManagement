import { PipeTransform, ArgumentMetadata, NotFoundException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidation implements PipeTransform{
    readonly allowStatus =[
        TaskStatus.DONE,
        TaskStatus.IN_PROGRESS,
        TaskStatus.OPEN,
    ]
    transform(value: any, metadata:ArgumentMetadata) {
        value= value.toUpperCase();
        if(!this.isStatusValid(value)){
            throw new NotFoundException(`"${value}" is not valid!`);
        }
        return value;
    }
    private isStatusValid(status: any){
        return (this.allowStatus.indexOf(status)!==-1);
    }

}