import { Body, Controller, Post } from '@nestjs/common';
import { User } from 'src/models/user/entitie/user';
import { UserService } from 'src/models/user/user.service';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public-decorator';

@Controller('auth')
export class AuthController {
  constructor(private userService:UserService, private authService:AuthService){

  }

  @Public()
  @Post('sign-in')
  async signIn(@Body() {email, password}): Promise<User> {
    const user = await this.userService.getByEmail(email);
    
    return this.authService.singIn(user, password);
  }
}
