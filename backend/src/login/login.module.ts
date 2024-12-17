import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '../common/cache/cache.module';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
    CacheModule,
  ],
  controllers: [LoginController],
  providers: [LoginService]
})
export class LoginModule {}
