export class RoleDto{
    id: number;
    
    roleName:string;

    constructor(init?:Partial<RoleDto>){
        if(init){
            this.id = init.id;
            this.roleName = init.roleName;
        }
    }
}