import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CacheModule } from '../cache/cache.module';
import { AuthGuard } from './auth.guard';

@Global()
@Module({
    imports: [CacheModule],
    providers: [AuthService, AuthGuard],
    exports: [AuthGuard, AuthService],
})
export class AuthModule {}
