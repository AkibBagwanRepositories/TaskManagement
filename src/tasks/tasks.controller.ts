import { Controller, Get, Post,Body, Param, ParseIntPipe, Delete,Patch, Query, ValidationPipe, UsePipes } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilter } from './dto/get-task-filter.dto';
import { TaskStatusValidation } from './pipes/task-status-validation.pipe';
import { AttachmentDto } from './dto/attachment.dto';
import { AttachmentEntity } from './attachment.entity';

@Controller('tasks')
export class TasksController {
    constructor(private readonly taskServices:TasksService){

    }
    
    @Get("all")
    getAllTasks():any{
        console.log("getall");
        return this.taskServices.getAllTasks();
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
    
    @Post(':id/attachment')
    addAttachmentToTask(@Param('id',ParseIntPipe)id:number,
    @Body('attachment')attachment:AttachmentDto[]):Promise<AttachmentEntity[]>{
        console.log("--> Attachment to Task","id:",id," to attachment: ",attachment);
        return this.taskServices.addAttachmentToTask(id,attachment);
    }

    @Delete(':id/attachment/:attachment')
    deleteAttachmentByIdToTask(@Param('id',ParseIntPipe)id:number,
    @Param('attachment')attachment:number):Promise<any>{
        console.log("--> Attachment to Task","id:",id," to attachment: ",attachment);
        return this.taskServices.deleteAttachmentByIdToTask(id,attachment);
    }

    
    
    @Post(':id/tags/:tag')
    addTagByIdToTask(@Param('id',ParseIntPipe)id:number,
    @Param('tag')tag:number):Promise<any>{
        console.log("--> Tag to Task","id:",id," to attachment: ",tag);
        return this.taskServices.addTagByIdToTask(id,tag);
    }
    
    @Delete(':id/tags/:tag')
    removetagFromTask(@Param('id',ParseIntPipe)id:number,
    @Param('tag')tag:number):Promise<any>{
        console.log("--> Tag from Task","id:",id," to attachment: ",tag);
        return this.taskServices.removetagFromTask(id,tag);
    }
    

    @Get()
    getTasks(@Query(ValidationPipe) filterDto:GetTaskFilter):Promise<Task[]>{
        console.log("--> get Task of ",filterDto);
        return this.taskServices.getTasks(filterDto);
    }
    
    @Delete(':id/attachments')
    deleteAttachmentFromTasks(@Param('id',ParseIntPipe)id:number):Promise<any>{
        console.log("--> delete all attachment of Task","id:",id);
        return this.taskServices.deleteAllAttachmentFromTasks(id);
    }

}
/** 
 * full body will accept Body
createTask(@Body() body){

 * get specific object from the Json
createTask(@Body('title') title: string,@Body('description') description: string){
            
            */
