import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {
    }
    @Post('google')
    handleGoogleLogin(@Body('code')code : string) {
        // accessToken을 활용해 사용자의 정보 요청하기
        this.loginService.getUserData(code);
    }
}
