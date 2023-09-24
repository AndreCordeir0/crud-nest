import { Role } from 'src/models/roles/entitie/role';
import { UserDto } from 'src/models/user/dtos/user-dto';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name:'user'})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @ManyToMany(()=>Role,{eager:true,cascade:true,onDelete:"CASCADE"})
  @JoinTable({
    name: "user_role",
    joinColumn: {name: "user_id", referencedColumnName: "id"},
    inverseJoinColumn: {name: "role_id", referencedColumnName: "id"},
  })
  roles:Role[];

  constructor(init?:Partial<UserDto>){
    if(init){
      this.id = init.id;
      this.name = init.name;
      this.password = init.password;
      this.email = init.email;
    }
  }
}
