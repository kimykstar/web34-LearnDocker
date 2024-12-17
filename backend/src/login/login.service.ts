import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class LoginService {
    constructor(private readonly httpService: HttpService) {
    }
    async getUserData(code: string) {
        const response = await this.httpService.axiosRef.post('https://oauth2.googleapis.com/token', {
            code,
            client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
            client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
            redirect_uri: 'http://localhost:3000/login/google',
            grant_type: 'authorization_code'
        })
        const responseData = response.data;
        const userResponse = await this.httpService.axiosRef.get('https://www.googleapis.com/oauth2/v3/userinfo',  {
            headers: {
                Authorization: `Bearer ${responseData.access_token}`,
            }
        });
        // console.log(userResponse.data);
        // 여기서 userResponse를 활용하면 됨
    }
}
