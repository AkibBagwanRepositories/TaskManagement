import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { AttachmentDto } from './dto/attachment.dto';
import { AttachmentEntity } from './attachment.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository){
    }
    async getTaskById(id: number): Promise<Task>{
        const found = await this.taskRepository.getTask(id);
        if(!found){
            throw new NotFoundException("No Record Found!");
        }
        return found;
    }
    async deleteTaskById(id:number):Promise<any>{
        const result = await this.taskRepository.deleteTaskById(id);
        if(result.affected===0){
            throw new NotFoundException("No Record Found!");
        }else
        {
            return {status:'success',message:'deleted successfuly'};
        }
    }
    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const tasks =await 
            (
                this.taskRepository.createTask(createTaskDto))
                    .then((task)=>{
                        return this.taskRepository.allById(task.id)
                    }
            );
        return tasks;
    }
    async updateTask(id:number,status:TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
    
    async addAttachmentToTask(id:number,attachment:AttachmentDto[]): Promise<AttachmentEntity[]>{
        return this.taskRepository.addAttachmentbyTaskId(id,attachment);
    }

    async deleteAttachmentByIdToTask(id:number,attachment:number): Promise<any>{
        return this.taskRepository.deleteAttachmentByIdFromTaskId(id,attachment);
    }
    
    
    async getTasks(filterDto:GetTaskFilter):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }
    
    async getAllTasks():Promise<any>{
        return await this.taskRepository.all();
    }
    
    async deleteAllAttachmentFromTasks(id:number):Promise<any>{
        return await this.taskRepository.deleteAllAttachmentsOfTaskById(id);
    }

    

    async addTagByIdToTask(id:number,tag:number): Promise<any>{
        return this.taskRepository.tagToTask(id,tag);
    }
    async removetagFromTask(id:number,tag:number): Promise<any>{
        return this.taskRepository.removetagFromTask(id,tag);
    }

    
    
}
