import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './models/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './models/user/user.module';

@Module({
  imports: [AuthModule,
    TypeOrmModule.forRoot({
      type :"sqlite",
      database: "iesb.sqlite",
      entities: [__dirname + "/models/../**/entitie/*.{js,ts}"],
      synchronize: false
    }),
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
