import { Repository, EntityRepository } from "typeorm";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { GetTaskFilter } from "./dto/get-task-filter.dto";
import { Subtask } from "./subtask.entity";
import { AttachmentEntity } from "./attachment.entity";
import { AttachmentDto } from "./dto/attachment.dto";
import { TagEntity } from "./tag.entity";

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
        const subtask = new Subtask();
        subtask.name = createTaskDto.subtask.name;
        await subtask.save();
        
        //Create Attachments
        const task =new  Task();
        task.title = title;
        task.descriprion = description;
        task.status = TaskStatus.OPEN;
        task.sub = subtask;
        await task.save(); // this process will take time to return the result

        createTaskDto.attachments.forEach(attachment=>(
            attachment.task = task
        ));
        await AttachmentEntity.createQueryBuilder().insert().values(createTaskDto.attachments).execute();
        return task;
    }
    
    async deleteTaskById(id: number): Promise<any>{
        return this.delete(id)
    }
    
    async all(): Promise<any>{
        return this.find({relations:['sub','att']});
    }
    
    async allById(id:number): Promise<any>{
        return this.findOne({relations:['sub','att'],where:{id},});
    }

    async deleteAllAttachmentsOfTaskById(id:number): Promise<any>{
        return this.findOne({relations:['sub','att'],where:{id},}).then(
            (task)=>{
                const ids = task.att.map(a=>a.id);
                return AttachmentEntity.createQueryBuilder().delete().whereInIds(ids).execute();
            }
        );
    }

    
    async addAttachmentbyTaskId(id:number,attachment:AttachmentDto[]): Promise<any>{
        return this.findOne({where:{id}}).then(
            (task)=>{
                attachment.map(a=>a.task=task)
                return AttachmentEntity.createQueryBuilder().insert().values(attachment).execute();
            }
        );
    }
    
    async deleteAttachmentByIdFromTaskId(id:number,attachment_id:number): Promise<any>{
        return this.findOne({where:{id}}).then(
            (task)=>{
                return AttachmentEntity.createQueryBuilder().delete().whereInIds(attachment_id).execute();
            }
        );
    }
    /**
        createTaskDto.attachments.forEach(attachment=>(
            attachment.task=task,
            //here we are assingin task to attachment
            // because we using Meny(Attachment) and one(Task) so,
            //Forgien key will be in Attachment table, Thats way we need to pass
            //Task as a argument here
            //this.saveAttachement(attachment)
            ));
        return task;
     */

    async saveAttachement(attachment: AttachmentEntity):Promise<AttachmentEntity>{
        return AttachmentEntity.save(attachment);
    }
    async tagToTask(id:number,tag:number){
        let tagData = await TagEntity.findOne({id:tag})
        const task = await Task.findOne({id:id});
        await Task.createQueryBuilder().relation('tags').of(task).add(tagData)
        return Task.find({relations:['tags','att'],where:{id:id}})
    }
    
    async removetagFromTask(id:number,tag:number){
        try{
            let tagData = await TagEntity.findOne({id:tag})
            const task = await Task.findOne({id:id});
            await Task.createQueryBuilder().relation('tags').of(task).remove(tagData)
            return Task.find({relations:['tags','att'],where:{id:id}});
        }catch(e){
            return {"error":e};
        }
    }
}