import { Controller, Get, Post,Body } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskServices:TasksService){

    }
    @Get()
    getAllTasks():Task[]{
        return this.taskServices.getAllTasks();
    }
    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto){
        console.log("--> Create Task","Title:",createTaskDto.title,"description: ",createTaskDto.description);
        return this.taskServices.createTask(createTaskDto)
    }
}
/** 
 * full body will accept Body
createTask(@Body() body){

 * get specific object from the Json
createTask(@Body('title') title: string,@Body('description') description: string){
            
            */
