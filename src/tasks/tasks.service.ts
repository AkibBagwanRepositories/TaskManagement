import { Injectable } from '@nestjs/common';
import { Task } from './task.model';
import { TaskStatus } from './task.model';
import * as uuid from 'uuid/v1'
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
    private tasks:Task[] =[];
    /**here we passed two array bracat it means Task[] array and tasks[]
     * in short tasks = Task[]
     */

    getAllTasks():Task[]{
        return this.tasks;
    }

    /**Create Task */
    createTask(createTaskDto: CreateTaskDto){
        const {title,description} = createTaskDto;// Distruct data
        const task: Task={
            id: uuid(),
            title,
            description,
            status: TaskStatus.OPEN,
        };
        this.tasks.push(task); //Saved task in 
        console.log("<-- Send Created Task",task)
        return task;//return newly created Task
    }
}
