import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CacheModule } from '../cache/cache.module';

@Global()
@Module({
  imports: [CacheModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
