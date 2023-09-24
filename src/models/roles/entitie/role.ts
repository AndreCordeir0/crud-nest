import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'roles'})
export class Role{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({name:'role_name'})
    roleName:string;

}