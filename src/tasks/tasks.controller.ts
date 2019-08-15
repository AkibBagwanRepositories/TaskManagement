import { Controller, Get, Post,Body, Param, ParseIntPipe, Delete,Patch, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskServices:TasksService){

    }
    @Get('/:id')
    getTask(@Param('id',ParseIntPipe)id:number):Promise<Task>{
        console.log("--> get Single Task","id:",id);
        return this.taskServices.getTaskById(id);
    }
    // @Get()
    // getAllTasks():Task[]{
    //     return this.taskServices.getAllTasks();
    // }
    @Post()
    @UsePipes(ValidationPipe)//Enter request body will compare with DTO
    createTask(@Body() createTaskDto: CreateTaskDto):Promise<Task>{
        console.log("--> Create Task","Title:",createTaskDto.title,"description: ",createTaskDto.description);
        return this.taskServices.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id', ParseIntPipe) id: number):Promise<any>{
        console.log("--> Delete Task","id:",id);
        return this.taskServices.deleteTaskById(id);
    }
    
    @Patch(':id/status')
    UpdateTask(@Param('id',ParseIntPipe)id:number,
    @Body('status',TaskStatusValidation)status:TaskStatus):Promise<Task>{
        console.log("--> Update Task","id:",id," to status: ",status);
        return this.taskServices.updateTask(id,status);
    }
    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTaskFilter):Promise<Task[]>{
        //console.log("--> Update Task","id:",id," to status: ",status);
        return this.taskServices.getTasks(filterDto);
    }
}
/** 
 * full body will accept Body
createTask(@Body() body){

 * get specific object from the Json
createTask(@Body('title') title: string,@Body('description') description: string){
            
            */
