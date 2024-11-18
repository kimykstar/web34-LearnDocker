import axios from 'axios';
import { ExpirationTime } from '../types/timer';

const PROXY_HOST = import.meta.env.VITE_PROXY_HOST;
const PROXY_PORT = import.meta.env.VITE_PROXY_PORT;

export const requestExpriationTime = async (): Promise<ExpirationTime> => {
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
