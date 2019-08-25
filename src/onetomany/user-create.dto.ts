import { ActivityEntity } from "./activity.entity";
import { UserEntity } from "./user.entity";

export class UserDto{
    name:string;
    activities:ActivityEntity[];
}
export class ActivityDto{
    name:string;
    user:UserEntity;
}

