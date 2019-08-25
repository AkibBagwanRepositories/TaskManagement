import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { OnetomanyService } from './onetomany.service';
import { UserDto, ActivityDto } from './user-create.dto';
import { UserEntity } from './user.entity';
import { ActivityEntity } from './activity.entity';

@Controller('onetomany')
export class OnetomanyController {
    constructor(private onetomanyService:OnetomanyService){}
     @Post()
     createUser(@Body() dto:UserDto) :Promise<UserEntity>{
        return this.onetomanyService.createUser(dto);
     }
     
     @Post("/:id")
     createActivity(@Param('id')id:number,@Body() dto:ActivityDto) :Promise<ActivityEntity>{
        return this.onetomanyService.createActivity(id,dto);
     }
     
     @Get()
     getAllUsers():Promise<UserEntity[]>{
         return this.onetomanyService.getAllUsers();
     }
     
     @Get("/withActivity")
     getAllUsersWithActivitys():Promise<any>{
         return this.onetomanyService.getAllUsersWithActivitys();
     }
}
