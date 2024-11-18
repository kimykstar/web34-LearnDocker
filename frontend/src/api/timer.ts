import axios from 'axios';
import { ExpirationTime } from '../types/timer';

const PROXY_HOST = import.meta.env.VITE_PROXY_HOST;
const PROXY_PORT = import.meta.env.VITE_PROXY_PORT;

export const requestExpriationTime = async (): Promise<ExpirationTime> => {
    // Todo: 테스트용 return 백엔드 구현 완료되면 아래 코드 사용할 예정
    return {
        maxAge: '2024-11-18T21:50',
    };
    try {
        const response = await axios.get<ExpirationTime>(
            `http://${PROXY_HOST}:${PROXY_PORT}/api/maxAge`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        return {
            maxAge: new Date(0).toString(),
        };
    }
};
