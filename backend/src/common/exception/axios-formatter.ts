import { AxiosError } from 'axios';

export function formatAxiosError(error: AxiosError) {
    return {
        message: error.message,
        stack: error.stack,
        cause: error.cause,
        code: error.code,
        url: error.config?.url,
        method: error.config?.method,
        status: error.response?.status,
        responseData: error.response?.data,
    };
}
