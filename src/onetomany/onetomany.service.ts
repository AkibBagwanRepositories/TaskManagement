import { Injectable } from '@nestjs/common';
import { UserDto, ActivityDto } from './user-create.dto';
import { ActivityRepository } from './activity.repository';
import { UserRepository } from './user.repository';
import { UserEntity } from './user.entity';
import { ActivityEntity } from './activity.entity';

@Injectable()
export class OnetomanyService {
    constructor(
        private readonly activityRepository:ActivityRepository,
        private readonly userRepository:UserRepository
    ){}
    
    async getAllUsers():Promise<UserEntity[]> {
        return await this.userRepository.find();
    }
    
    async getAllUsersWithActivitys():Promise<UserEntity[]> {
        return await this.userRepository.find({relations:['activities']});
    }

    async createUser(dto:UserDto) :Promise<UserEntity>{
        return await this.userRepository.save(dto);
    }

    
    async createActivity(id: number, dto: ActivityDto): Promise<ActivityEntity> {
        return this.userRepository.findOne({id}).then(
            (user)=>{
                dto.user = user;
                return this.activityRepository.save(dto);
            }
        );
    }
}
