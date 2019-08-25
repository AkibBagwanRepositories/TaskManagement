import { Task } from "../task.entity";

export class AttachmentDto{
    name:string;
    type:string;
    task:Task;
}