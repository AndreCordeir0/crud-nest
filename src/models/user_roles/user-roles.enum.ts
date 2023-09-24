export class UserRolesEnum{
    static readonly USER  =  {id:2, rolesPermissions:[]} ;
    static readonly ADMIN  = {id:1, rolesPermissions:[UserRolesEnum.USER]};
    static readonly OWNER  = {id:3, rolesPermissions:[UserRolesEnum.USER,UserRolesEnum.ADMIN]};


    static findEnum(id){
        switch(id){
            case UserRolesEnum.USER.id:
                return UserRolesEnum.USER;
            case UserRolesEnum.ADMIN.id:
                return UserRolesEnum.ADMIN;
            case UserRolesEnum.OWNER.id:
                return UserRolesEnum.OWNER;
        }
    }
}