import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilter } from "./dto/get-task-filter.dto";

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTaskFilter): Promise<Task[]> {
        const {status,search} = filterDto;
        const query = this.createQueryBuilder('task');
        if(status){
            query.andWhere('task.status = :status',{status});//:status < variable reff | task.statsu < table.column
        }
        if(search){
            query.andWhere('task.title LIKE :search OR task.descriprion LIKE :search ',{search:`%${search}%`});
            /**We can't use %:search% so we are using {search:`%${search}%`}
             * in this we are passing search string in the variable it self
            */
        }
        const tasks = await query.getMany()
        return tasks;
    }
    
    async getTask(id:number):Promise<Task>{
        return this.findOne(id);
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task>{
        const {title,description} = createTaskDto;
        const task =new  Task();
        task.title = title;
        task.descriprion = description;
        task.status = TaskStatus.OPEN;
        await task.save(); // this process will take time to return the result
        return task;
    }
    
    async deleteTaskById(id: number): Promise<any>{
        return this.delete(id)
    }
}