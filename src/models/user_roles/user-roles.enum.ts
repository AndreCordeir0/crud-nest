export enum UserRolesEnum{
    ADMIN  = 1,
    USER  =  2,
    OWNER  = 3
}

export class UserRoleUtils{
    static permissions(userRole:UserRolesEnum):UserRolesEnum[]{
        switch(userRole){
            case UserRolesEnum.ADMIN:
                return [UserRolesEnum.USER];
            case UserRolesEnum.OWNER:
                return [UserRolesEnum.USER,UserRolesEnum.ADMIN];
            default:
                return [];
        }
    }
    static findEnum(id): UserRolesEnum{
        switch(id){
            case UserRolesEnum.USER:
                return UserRolesEnum.USER;
            case UserRolesEnum.ADMIN:
                return UserRolesEnum.ADMIN;
            case UserRolesEnum.OWNER:
                return UserRolesEnum.OWNER;
        }
    }
    static findEnumByString(enumString: string): UserRolesEnum{
        switch(enumString){
            case 'USER':
                return UserRolesEnum.USER;
            case 'ADMIN':
                return UserRolesEnum.ADMIN;
            case 'OWNER':
                return UserRolesEnum.OWNER;
        }
    }

}