import { IsNotEmpty } from "class-validator";
import { Subtask } from "../subtask.entity";
import { AttachmentEntity } from "../attachment.entity";

export class CreateTaskDto{
    @IsNotEmpty()
    title: string;
    
    @IsNotEmpty()
    description: string;

    subtask:Subtask;

    attachments:AttachmentEntity[];
}