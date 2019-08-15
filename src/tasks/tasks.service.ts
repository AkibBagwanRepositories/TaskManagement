import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { GetTaskFilter } from './dto/get-task-filter.dto';

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
        return this.taskRepository.createTask(createTaskDto);
    }
    async updateTask(id:number,status:TaskStatus): Promise<Task>{
        const task = await this.getTaskById(id);
        task.status = status;
        await task.save();
        return task;
    }
    async getTasks(filterDto:GetTaskFilter):Promise<Task[]>{
        return this.taskRepository.getTasks(filterDto);
    }
}
